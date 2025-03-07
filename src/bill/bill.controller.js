import Bill from "./bill.model.js";

export const updateBill = async (req, res) => {
    try {
        const { bip } = req.params; 
        const { quantity, productId } = req.body; 

        const bill = await Bill.findById(bip);
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found",
            });
        }

        const productInBill = bill.products.find(
            (item) => item.product.toString() === productId
        );

        if (!productInBill) {
            return res.status(404).json({
                success: false,
                message: "Product not found in the bill",
            });
        }

        productInBill.quantity = quantity;

        if (productInBill.quantity <= 0) {
            bill.products = bill.products.filter(
                (item) => item.product.toString() !== productId
            );
        }

        await bill.calculateTotal();

        await bill.save();

        return res.status(200).json({
            success: true,
            message: "Bill updated successfully",
            bill, 
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating the bill",
            error: err.message,
        });
    }
};