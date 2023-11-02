const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


const CreateProducts = asyncHandler(async(req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    reqularPrice,
    color,
  } = req.body;

  if(!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all Fields")
  }

// Create Products
const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    reqularPrice,
    color, 
})
res.status(200).json(product)

})

//Get Product

const getProducts = asyncHandler(async(req, res) => {
   const products = await Product.find().sort("-createdAd");
   res.status(200).json(products);

})
//Get a single products

const getProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) {
    res.status(404)
    throw new Error("Products not found.")
  }
  res.status(200).json(product)
});

// Delete Product
const deleteProducts = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) {
    res.status(404)
    throw new Error("Products not found.")
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({message: "Product Deleted"})
})

// Update Product
const updateProduct = asyncHandler(async(req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    reqularPrice,
    color,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if(!product) {
    res.status(404)
    throw new Error("Products not found.")
  }
  
  // update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    {_id: req.params.id},
    {
      name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    reqularPrice,
    color,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedProduct)

})

// Review Products
const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // validation
  if (star < 1 || !review) {
    res.status(400).json({ error: "Please add a star and a review" });
    return;
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Update Rating
    product.ratings.push({
      star,
      review,
      reviewDate,
      name: req.user.name,
      userID: req.user._id,
    });

    await product.save();
    res.status(200).json({ message: "Product review added" });
  } catch (error) {
    // Handle any other errors that might occur
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Review

const deleteReview = asyncHandler(async(req, res) => {
  const {userID} = req.body;
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  const newRatings = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString()
  })
  product.ratings = newRatings
  product.save();
  res.status(200).json({ message: "Product review deleted" });
})

module.exports = {
    CreateProducts,
    getProducts,
    getProduct,
    deleteProducts,
    updateProduct,
    reviewProduct,
    deleteReview
};