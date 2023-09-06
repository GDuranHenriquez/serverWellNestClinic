const { Puntuation, Product } = require("../../db");

const postPuntuation = async (req, res) => {
    try {
        const { text, stars, product } = req.body;

        if(!text) {

            throw Error("Please leave a comment");

        } else if(!stars) {

            throw Error("Please leave a puntuation");

        }
        const response = await Puntuation.create({text, stars});
        await response.setPuntuation_Product(product)

        res.status(200).json({message: "Puntuation posted successfully"});

    } catch (error) {
        
        return res.status(404).send({error: error.message});

    }
};

module.exports = {postPuntuation};