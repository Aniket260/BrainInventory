const mongoose = require("mongoose");
const product = mongoose.model('Product');

const tool = require('../utils/tools');
const ProductModel = require("../models/product.model");

const productController = {
  addProduct: async (req, res) => {
    try {
      const { ProductName, Description, Price, Quantity } = req.body;
      if (!req.currentUser) {
        return res.status(401).json({
          success: false,
          message: "Not Authorized",
        });
      }
      if(!ProductName || !Description || !Price || !Quantity){
        return res.status(422).json({
          success: false,
          message: "Invalid Params",
        });
      }
      if(!tool.StringValidation(ProductName)){
        return res.status(422).json({
          success: false,
          message: "Invalid Product Name",
        });
      } else if(!tool.StringValidation(Description)){
        return res.status(422).json({
          success: false,
          message: "Invalid Description",
        });
      } else if(!tool.NumberValidation(Price)){
        return res.status(422).json({
          success: false,
          message: "Invalid Price",
        });
      } else if(!tool.NumberValidation(Quantity)){
        return res.status(422).json({
          success: false,
          message: "Invalid Quantity",
        });
      }
      const newProduct = new ProductModel({
        ProductName,
        Description,
        Price,
        Quantity
      })
      savedProduct = await newProduct.save();
      if(savedProduct){
        return res.status(201).json({
          success: true,
          message: "Product Saved Successfully",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Product can't saved!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      if (!req.currentUser) {
        return res.status(401).json({
          success: false,
          message: "Not Authorized",
        });
      }
      const ProductList = await ProductModel.find();
      return res.status(200).json({
        success: true,
        ProductList
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      if (!req.currentUser) {
        return res.status(401).json({
          success: false,
          message: "Not Authorized",
        });
      }
      const {_id, ProductName, Description, Price, Quantity } = req.body;
      if(!_id){
        return res.status(422).json({
          success: false,
          message: "Invalid Product Id",
        });
      }
      if(!tool.StringValidation(ProductName)){
        return res.status(422).json({
          success: false,
          message: "Invalid Product Name",
        });
      } else if(!tool.StringValidation(Description)){
        return res.status(422).json({
          success: false,
          message: "Invalid Description",
        });
      } else if(!tool.NumberValidation(Price)){
        return res.status(422).json({
          success: false,
          message: "Invalid Price",
        });
      } else if(!tool.NumberValidation(Quantity)){
        return res.status(422).json({
          success: false,
          message: "Invalid Quantity",
        });
      }

      const Product = await ProductModel.findOne({_id});

      if(!Product){
        return res.status(422).json({
          success: false,
          message: "Invalid Product Id",
        });
      }
      const updateObj = {
        ProductName, Description, Price, Quantity
      }
      const updateProduct = await ProductModel.updateOne({_id},{$set: updateObj});

      return res.status(200).json({
        success: true,
        message: "Product Updated",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      if (!req.currentUser) {
        return res.status(401).json({
          success: false,
          message: "Not Authorized",
        });
      }
      const {
        _id
      } = req.query;
      if(!_id){
        return res.status(422).json({
          success: false,
          message: "Invalid Product Id",
        });
      }
      const Product = await ProductModel.findOne({_id});

      if(!Product){
        return res.status(422).json({
          success: false,
          message: "Invalid Product Id",
        });
      }
      await ProductModel.deleteOne({_id});
      return res.status(200).json({
        success: true,
        message: "Product Deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
};

module.exports = productController;
