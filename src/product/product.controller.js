'use strict';

import Product from "./product.model.js";
import Category from "../category/category.model.js";

export const addProduct = async (req, res) => {
    try {
        const data = req.body;

        const category = await Category.findOne({ nameCategory: data.category });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        const product = new Product({
            ...data,
            category: category._id, 
        });

        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product added successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving product',
            error: error.message
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { limit = 5, from = 0 } = req.query; 
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query), 
            Product.find(query) 
                .skip(Number(from)) 
                .limit(Number(limit)) 
                .populate("category", "nameCategory") 
        ]);

        return res.status(200).json({
            success: true,
            message: "Product Catalog",
            total, 
            products 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error when displaying the product catalog.',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { uid } = req.params;
        const { ...data } = req.body;

        const product = await Product.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { uid } = req.params;

        const product = await Product.findByIdAndDelete(uid);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
            product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

export const getMostSoldProducts = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query; 
        const query = { status: true }; 

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query) 
                .sort({ sold: -1 }) 
                .skip(Number(from)) 
                .limit(Number(limit))
                .select('name sold _id') 
        ]);

        return res.status(200).json({
            success: true,
            message: 'Most sold products',
            total, 
            products 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting most sold products',
            error: error.message
        });
    }
};

export const getSoldOutProducts = async (req, res) => {
    try {
        const { limit = 5, from = 0 } = req.query; 
        const query = { stock: 0, status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query), 
            Product.find(query) 
                .skip(Number(from))
                .limit(Number(limit))
                .select('name stock _id')
        ]);

        return res.status(200).json({
            success: true,
            message: 'Sold out products',
            total, 
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error when displaying the sold out products catalog.',
            error: error.message
        });
    }
};

export const inventory = async (req, res) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .select('name stock _id')
        ]);

        return res.status(200).json({
            success: true,
            message: "Inventory products",
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error when displaying the inventory.',
            error: err.message
        });
    }
};

export const filterProducts = async (req, res) => {
    try {
        const { category, sort, keyWords } = req.body;
        const filter = { status: true }; 

        if (keyWords) {
            filter.nameProduct = { $regex: keyWords, $options: 'i' }; 
        }
        if (category) {
            filter.category = category;
        }
        const sortOption = {};
        if (sort === 'az') {
            sortOption.nameProduct = 1; 
        } else if (sort === 'za') {
            sortOption.nameProduct = -1; 
        } else if (sort === 'priceAsc') {
            sortOption.price = 1; 
        } else if (sort === 'priceDesc') {
            sortOption.price = -1; 
        }

        const products = await Product.find(filter)
            .sort(sortOption)
            .populate("category", "nameCategory");

        return res.status(200).json({
            success: true,
            message: 'Filtered products',
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error when filtering products.',
            error: err.message
        });
    }
};
