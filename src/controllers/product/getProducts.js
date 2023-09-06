const { Product, Score } = require("../../db")

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({where: {deleted: false}, include: {model: Score, as: 'Product_Score'}});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getProducts};