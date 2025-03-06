import { Schema, model } from "mongoose";

const categorySchema = Schema({
    nameCategory: {
        type: String,
        required: [true, "Name category is required"],
        maxLength: [50, "Name category cannot exceed 50 characters"],
        unique: true
    },
    descriptionCategory: {
        type: String,
        maxLength: [200, "Description category cannot exceed 200 characters"],
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model('Category', categorySchema);