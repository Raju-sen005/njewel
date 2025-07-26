module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAll,
  getById,
};

function getModels() {
  const db = require("../_helpers/db"); // fresh require
  return {
    Product: db.Product,
    ProductVariant: db.ProductVariant,
  };
}

// Create Product with Variants
async function createProduct(params) {
  const { Product, ProductVariant } = getModels();

  // Create the product
  const product = await Product.create();

  // Add variants
  if (Array.isArray(params.variants)) {
    for (const variant of params.variants) {
      await ProductVariant.create({
        ...variant,
        productId: product.id,
        images: variant.images, // Store the filenames array in the 'images' field
      });
    }
  }

  return product;
}

// Get all products with variants
async function getAll() {
  const { Product, ProductVariant } = getModels();
  return await Product.findAll({
    include: [
      {
        model: ProductVariant,
      },
    ],
  });
}

// Get product by ID with variants
async function getById(id) {
  const { Product, ProductVariant } = getModels();
  return await ProductVariant.findByPk(id);
}

// Update product (currently just an ID, so no fields to update)
async function updateProduct(id, params) {
  const { Product, ProductVariant } = getModels();

  // First get the existing variant to find its associated product
  const existingVariant = await ProductVariant.findByPk(id);
  if (!existingVariant) throw "Variant not found";

  const productId = existingVariant.productId; // Get the parent product ID

  // Update product fields if any are provided in params
  if (params.name || params.description || params.otherProductFields) {
    const product = await Product.findByPk(productId);
    if (!product) throw "Associated product not found";
    await product.update(params);
  }

  // Handle variants update
  if (Array.isArray(params.variants)) {
    // Get all existing variants for this product
    const existingVariants = await ProductVariant.findAll({
      where: { productId: productId },
    });
    const existingVariantIds = existingVariants.map((v) => v.id);

    // Process each variant in the request
    for (const variantData of params.variants) {
      if (variantData.id && existingVariantIds.includes(variantData.id)) {
        // Update existing variant
        const variant = existingVariants.find((v) => v.id === variantData.id);
        await variant.update({
          ...variantData,
          // Only update images if new ones are provided
          images: variantData.images ? variantData.images : variant.images,
        });
      } else if (!variantData.id) {
        // Create new variant for this product
        await ProductVariant.create({
          ...variantData,
          productId: productId, // Associate with the same product
          images: variantData.images || [],
        });
      }
    }

    // Delete variants that were removed (except the one we're updating)
    const newVariantIds = params.variants
      .map((v) => v.id)
      .filter(Boolean)
      .concat([id]); // Keep the current variant being updated

    const variantsToDelete = existingVariantIds.filter(
      (vid) => !newVariantIds.includes(vid)
    );

    if (variantsToDelete.length > 0) {
      await ProductVariant.destroy({ where: { id: variantsToDelete } });
    }
  } else if (params.variants === undefined) {
    // If no variants array provided, just update the specific variant
    await ProductVariant.update(params, { where: { id } });
  }

  return await getById(productId); // Return updated product with all variants
}

// Delete product and its variants
async function deleteProduct(id) {
  const { Product, ProductVariant } = getModels();
  const product = await ProductVariant.findByPk(id);
  if (!product) throw "Product not found";

  await ProductVariant.destroy({ where: { id: id } });
  // await product.destroy();
}
