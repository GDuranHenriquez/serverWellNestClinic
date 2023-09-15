const { Product, Average, Laboratory, PresentationType, Drug } = require("../../db")
const {Op} = require('sequelize')
const { getTokenFromHeader } = require('../token/getTokenFromHeader')
const {verifyAdmin} = require('../../auth/verifyAdmin')

const getProducts = async (req, res) => {
    try {
        const token = getTokenFromHeader(req.headers)
        const isAdmin = verifyAdmin(token)
        const {sort, order, presentation, priceRange} = req.query
        const filters = {}
        if(!isAdmin){
            filters.delete = false
        }
        if(presentation){
            filters.presentationType = presentation
        }
        if(priceRange){
            filters.price = {
                [Op.between] : JSON.parse(priceRange)
            }
        }

        let defaultOrder =  order ? order : 'ASC'
        let defaultSort = sort ? sort : 'name'

        let orderConfig = sort === 'rating' ? [[{model: Average, as: 'Product_Average'}, 'averageRating', defaultOrder]] : [[defaultSort, defaultOrder]]

        const products = await Product.findAll({
            where: filters,
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
            order: orderConfig
        });

        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getProducts};