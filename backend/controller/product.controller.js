import Product from "../models/Product.model.js";
import Redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); //find all products
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
// bu fonk da FeaturesProductı redisden cekicez bu sayede cok daha hızlı olur
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await Redis.get("FeaturedProducts");

    if (featuredProducts) {
      return res.status(200).json({
        products: JSON.parse(featuredProducts),
      });
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts || featuredProducts.length === 0) {
      return res.status(200).json({
        message: "Featured products not found",
        products: [],
      });
    }

    await Redis.set(
      "FeaturedProducts",
      JSON.stringify(featuredProducts),
      "EX",
      60 * 60, // 1 saat cache
    );

    res.status(200).json({ products: featuredProducts });
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProducstByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getProducstByCategory controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

import sharp from "sharp";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, gender } = req.body;
    let { sizes } = req.body;

    if (typeof sizes === "string") {
      sizes = [sizes];
    }

    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // 1️ OPTIMIZE IMAGE
        const optimizedPath = `uploads/optimized-${file.filename}`;

        await sharp(file.path)
          .resize({ width: 1600 })
          .jpeg({ quality: 80 })
          .toFile(optimizedPath);

        //  UPLOAD OPTIMIZED IMAGE
        const result = await cloudinary.uploader.upload(optimizedPath, {
          folder: "products",
          resource_type: "image",
        });

        uploadedImages.push(result.secure_url);

        //  CLEAN UP FILES
        fs.unlinkSync(file.path); // original
        fs.unlinkSync(optimizedPath); // optimized
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: uploadedImages,
      gender,
      sizes,
    });

    return res.status(201).json({ product });
  } catch (error) {
    console.log("Error in createProduct", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Cloudinary'deki TÜM image'ları sil
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        try {
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`products/${publicId}`);
        } catch (error) {
          console.log("Error deleting image from Cloudinary:", error.message);
        }
      }
    }

    //  Product'ı DB'den sil
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: {
          // rastgele 21 urunu her ıstekte getırıır
          size: 21,
        },
      },
      {
        $project: {
          //getırılen urunlerden sadece _id,name,image ve price ve sizes getırılır
          _id: 1,
          name: 1,
          images: 1,
          price: 1,
          sizes: 1,
        },
      },
    ]);
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    await product.save();
    updateProductFeaturedCache();
    res.status(200).json({ product });
  } catch (error) {
    console.log("Error in toogleFeaturedProduct controller", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//updateProductFeaturedCache in redis
async function updateProductFeaturedCache() {
  try {
    let FeaturedProducts = await Product.find({ isFeatured: true }).lean();

    //set FeaturedProducts (IN MONGO DB) to redis
    Redis.set("FeaturesProducts", JSON.stringify(FeaturedProducts));
  } catch (error) {
    console.log(
      "Error in updateProductFeaturedCache Controller",
      error.message,
    );
  }
}

//update quantity,delete
