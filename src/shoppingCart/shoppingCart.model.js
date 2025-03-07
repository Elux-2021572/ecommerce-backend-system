import mongoose from 'mongoose';

const shoppingCartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

export const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
