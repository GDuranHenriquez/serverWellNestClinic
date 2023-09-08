const {Product, PresentationType, Drug, Laboratory, Score} = require("../../db");

async function getProductById(req, res) {
    const {productId} = req.params;
    try {
        const product = await Product.findOne({
            where: {id: productId},
            include:[
                {
                    model: PresentationType,
                    as: 'Product_PresentationType'
                },
                {
                    model: Drug,
                    through: {attributes: []}
                },
                {
                    model: Laboratory,
                    as: 'Product_Laboratory'
                },
                {
                    model: Score,
                    as: 'Product_Score'
                }
            ]
        });
        if(!product || product.deleted) {
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({error: `Something went wrong: ${error.message}`});
    }
}

module.exports = getProductById