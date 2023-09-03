const {Product, PresentationType, Drug, Laboratory} = require("../../db");
const {Op} = require('sequelize')

async function getProductByName(req, res) {
    const {productName} = req.params;
    try {
        const product = await Product.findAll({
            where: {
                deleted: false,
                name: {
                    [Op.iLike]: `%${productName}%`,
                },
            },
            include:[
                {
                    model: PresentationType,
                    as: 'Product_PresentationType'
                },
                {
                    model: Drug,
                    through: {attributes: []},
                },
                {
                    model: Laboratory,
                    as: 'Product_Laboratory'
                }
            ]
        });
        if(!product.length || product.deleted) {
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({error: `Something went wrong: ${error.message}`});
    }
}

module.exports = getProductByName