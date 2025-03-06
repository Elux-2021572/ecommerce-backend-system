'use strict';

import Product from "../product/product.model.js";
import Category from "./category.model.js";

export const addCategory = async (req, res) => {
    try {
        const { nameCategory, descriptionCategory } = req.body;

        const existingCategory = await Category.findOne({ nameCategory });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = new Category({ nameCategory, descriptionCategory });
        await category.save();

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding category",
            error: error.message
        });
    }
};

export const getCategory = async (_req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting list of categories",
            error: error.message
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nameCategory, descriptionCategory } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        category.nameCategory = nameCategory || category.nameCategory;
        category.descriptionCategory = descriptionCategory || category.descriptionCategory;
        category.dateUpdate = Date.now();

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating category",
            error: error.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await Category.findByIdAndDelete(id);

        const categoryDefault = await Category.findOne({ nameCategory: "General" });
        if (categoryDefault) {
            await Product.updateMany({ category: id }, { category: categoryDefault._id });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: error.message
        });
    }
};
