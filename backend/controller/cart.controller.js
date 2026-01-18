import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const user = req.user;
    const normalizedSize = size ?? null;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // size zorunlu ürün
    if (product.sizes.length > 0 && !normalizedSize) {
      return res
        .status(400)
        .json({ message: "Size is required for this product" });
    }

    if (
      normalizedSize &&
      product.sizes.length > 0 &&
      !product.sizes.includes(normalizedSize)
    ) {
      return res.status(400).json({ message: "Invalid size selected" });
    }

    const existingItem = user.cartItems.find(
      (item) =>
        item.product.toString() === productId &&
        (item.size ?? null) === normalizedSize,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({
        product: productId,
        size: normalizedSize,
        quantity: 1,
      });
    }

    await user.save();
    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { quantity, size } = req.body;
    const { id: productId } = req.params;
    const user = req.user;
    const normalizedSize = size ?? null;

    const existingItem = user.cartItems.find(
      (item) =>
        item.product.toString() === productId &&
        (item.size ?? null) === normalizedSize,
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity <= 0) {
      user.cartItems = user.cartItems.filter(
        (item) =>
          !(
            item.product.toString() === productId &&
            (item.size ?? null) === normalizedSize
          ),
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId, size } = req.body;
    const normalizedSize = size ?? null;

    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    user.cartItems = user.cartItems.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          (item.size ?? null) === normalizedSize
        ),
    );

    await user.save();
    return res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in removeFromCart controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "cartItems.product",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = user.cartItems
      //  populate edilemeyen (null) productları temizle
      .filter((item) => item.product)
      .map((item) => ({
        ...item.product.toObject(),
        productId: item.product._id.toString(),
        quantity: item.quantity,
        size: item.size,
      }));

    return res.status(200).json({ cartItems });
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = req.user;
    user.cartItems = [];
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cartItems: [],
    });
  } catch (error) {
    console.log("Error in clearCart controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
