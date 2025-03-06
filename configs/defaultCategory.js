import Category from "../src/category/category.model.js";

export const defaultCategory = async () => {
    try {
        const categoryExist = await Category.findOne({ nameCategory: "General Category" });

        if (categoryExist) {
            return console.log("There is already a General Category");
        }

        await Category.create({
            nameCategory: "General Category",
            descriptionCategory: "This category groups products that do not have a specific classification."
            
        });

        console.log("Default category successfully created");
    } catch (err) {
        console.error("Error creating default category:", err.message);
    }
};
