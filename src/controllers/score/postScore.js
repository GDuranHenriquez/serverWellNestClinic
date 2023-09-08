const { Score, Product, Average } = require("../../db");
const sequelize = require('sequelize')

const postScore = async (req, res) => {
    try {
        const { text, stars, product } = req.body;

        if(!text) {

            throw Error("Please leave a comment");

        } else if(!stars) {

            throw Error("Please leave a score");

        }
        const productToScore = await Product.findByPk(product)
        if(!productToScore){
            return res.status(404).json({error: "The product id provided dosn't exist"})
        }
        const score = await Score.create({text, stars, product});
        const scores = await Score.findAll({where: {product}, attributes: [[sequelize.fn("avg", sequelize.col("stars")), "average"]], raw: true})
        const averageRating = parseFloat(scores[0].average || 0);
        const averageToUpdate = await Average.findOne({where: {product}})
        if(averageToUpdate){
            await averageToUpdate.update({averageRating});
        }

        res.status(200).json(score);

    } catch (error) {
        
        return res.status(500).send({error: error.message});

    }
};

module.exports = {postScore};