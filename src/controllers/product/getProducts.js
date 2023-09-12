const { Product, Average, Laboratory, PresentationType, Drug } = require("../../db")

const getProducts = async (req, res) => {
    try {

        const {sort, order} = req.query

        let defaultOrder =  order ? order : 'ASC'
        let defaultSort = sort ? sort : 'name'

        let search = sort === 'rating' ? [[{model: Average, as: 'Product_Average'}, 'averageRating', defaultOrder]] : [[defaultSort, defaultOrder]]

        const products = await Product.findAll({
            where: {deleted: false},
            include: [
                {
                    model: Average,
                    as: 'Product_Average',
                    attributes: ['averageRating']
                },
                {
                    model: Laboratory,
                    as: "Product_Laboratory",
                    attributes: ['name']
                },
                {
                    model: PresentationType,
                    as: "Product_PresentationType",
                    attributes: ['type']
                },
                {
                    model: Drug,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                },
            ],
            order: search
        });

        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getProducts};