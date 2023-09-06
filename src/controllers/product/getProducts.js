const { Product, Score } = require("../../db")

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({where: {deleted: false}, include: {model: Score, as: 'Product_Score'}});
        for (const product of products) {
            const ratings = await product.getProduct_Score();
            if (ratings.length > 0) {
                const totalRating = ratings.reduce((sum, rating) => sum + rating.stars, 0);
                const averageRating = totalRating / ratings.length;
                product.averageRating = averageRating.toFixed(1);
            } else {
                // Si no hay puntuaciones, establece el promedio en 0
                product.averageRating = 0;
            }
        }
        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getProducts};