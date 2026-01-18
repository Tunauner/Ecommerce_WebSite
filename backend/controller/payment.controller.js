import Coupon from "../models/Coupon.model.js";
import Order from "../models/Order.model.js";
import stripe from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // cent format
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.images?.[0]],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
            size: p.size || null,
          }))
        ),
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ url: session.url, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};
//create stripe coupon
async function createStripeCoupon(discountPercentage) {
  const stripeCoupon = await stripe.coupons.create({
    duration: "once",
    percent_off: discountPercentage,
  });
  return stripeCoupon.id;
}

//create new coupon in DB
async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 9),
    discountPercentage: 10,
    userId: userId,
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await newCoupon.save();
}

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const products = JSON.parse(session.metadata.products);

    const order = await Order.findOneAndUpdate(
      { stripeSessionId: sessionId },
      {
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
          size: product.size,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      },
      {
        upsert: true, // varsa güncelle, yoksa oluştur
        new: true,
      }
    );

    if (session.metadata.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
          isActive: true,
        },
        { isActive: false }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Order processed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("checkoutSuccess error:", error);
    return res.status(500).json({ message: error.message });
  }
};
