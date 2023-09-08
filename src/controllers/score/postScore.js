const { Score, Product } = require("../../db");

const postScore = async (req, res) => {
    try {
        const { text, stars, product } = req.body;

        if(!text) {

            throw Error("Please leave a comment");

        } else if(!stars) {

            throw Error("Please leave a score");

        }
        const score = await Score.create({text, stars});
        
        const productToScore = await Product.findByPk(product)
        await productToScore.addProduct_Score(score)

        for (const product of productToScore) {
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

        res.status(200).json({message: "Score posted successfully"});

    } catch (error) {
        
        return res.status(404).send({error: error.message});

    }
};

module.exports = {postScore};