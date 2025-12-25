import Product from "../models/product.models.js";

// get all products (public access) - get /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || `Failed to get all products` });
  }
};

//get product by id(public access) - get /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
      console.log(product.name);
    } else {
      res.status(404).json({ message: `Product not found` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || `Failed to get prodct by id` });
  }
};

//create product (admin only) - post /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      image: image || "",
      category,
      stock: Number(stock),
    });
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || `Failed to create product` });
  }
};

//update product (admin only) - patch /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updateProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || `Failed to update product` });
  }
};

//delete product (admin only) - delete /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: `Product delted ` }, deletedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || `Failed to delete product` });
  }
};
