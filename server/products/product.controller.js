const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request.js");
const authorize = require("../_middleware/authorize.js");
const Role = require("../_helpers/role.js");
const productService = require("./product.service.js");
const upload = require("../_middleware/upload.js");

// routes
router.post(
  "/",
  authorize(Role.Admin), // Admin only
  upload.any(), // Accepts all variant images
  createProduct
);

router.put("/:id", authorize(Role.Admin), upload.any(), updateProduct);

router.delete("/:id", authorize(Role.Admin), deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById); // changed PATCH -> GET for standard REST

module.exports = router;

// handlers
async function createProduct(req, res, next) {
  try {
    const files = req.files;
    const productData = req.body;

    // Parse variants if they are in string format
    if (typeof productData.variants === "string") {
      productData.variants = JSON.parse(productData.variants);
    }

    // Initialize a map to store files for each variant
    const fileMap = {};

    // Map the files by variant index
    files.forEach((file) => {
      const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
      if (match) {
        const variantIndex = match[1];
        if (!fileMap[variantIndex]) {
          fileMap[variantIndex] = [];
        }
        fileMap[variantIndex].push(file.filename); // Save the filename or path
      }
    });

    // Assign the images to the corresponding variants
    productData.variants.forEach((variant, index) => {
      variant.images = fileMap[index] || [];
    });

    // Now save the product data along with variants and images
    const product = await productService.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

async function getAllProducts(req, res, next) {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const files = req.files || [];
    const productData = req.body;
    const productId = req.params.id;

    // Parse variants if they are in string format
    if (typeof productData.variants === "string") {
      productData.variants = JSON.parse(productData.variants);
    }

    // Get existing product with variants to preserve existing images
    const existingProduct = await productService.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Initialize a map to store files for each variant
    const fileMap = {};

    // Map the files by variant index
    files.forEach((file) => {
      const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
      if (match) {
        const variantIndex = match[1];
        if (!fileMap[variantIndex]) {
          fileMap[variantIndex] = [];
        }
        fileMap[variantIndex].push(file.filename);
      }
    });

    // Prepare variants data with images
    if (productData.variants) {
      productData.variants.forEach((variant, index) => {
        // If new images were uploaded, use them
        if (fileMap[index]) {
          variant.images = fileMap[index];
        }
        // If no new images but variant has ID, preserve existing images
        else if (variant.id) {
          const existingVariant = existingProduct.ProductVariants.find(
            (v) => v.id === variant.id
          );
          if (existingVariant) {
            variant.images = existingVariant.images;
          }
        }
        // For new variants with no images, initialize empty array
        else {
          variant.images = [];
        }
      });
    }

    // Update the product data
    const updatedProduct = await productService.updateProduct(
      productId,
      productData
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
}
