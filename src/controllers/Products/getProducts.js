const { Product } = require("../../db")

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({where: {delete: true}});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getProducts;