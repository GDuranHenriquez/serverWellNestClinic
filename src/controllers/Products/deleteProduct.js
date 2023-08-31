const {Product} = require("../../db");

async function deleteProduct(req, res) {
    const {productId} = req.params;
    try {
        const product = await Product.findByPk(productId);
        if(!product.name || product.deleted) {
            return res.status(404).json({msg: 'Product not found'});
        }
        await product.update({deleted: true});
        return res.json({msg: 'Product Deleted'});
    } catch (error) {
        return res.status(500).json({msg: `Something went wrong: ${error.message}`});
    }
}

module.exports = deleteProduct;