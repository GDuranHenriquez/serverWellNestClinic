const {Product, PresentationType, Drug, Laboratory, Average} = require("../../db");
const {Op} = require('sequelize')

async function getProductByName(req, res) {
    try {
        const {productName} = req.params
        const {sort, order, presentation, priceRange} = req.query
        const filters = {deleted: false}
        if(presentation){
            filters.presentationType = presentation
        }
        if(priceRange){
            filters.price = {
                [Op.between] : JSON.parse(priceRange)
            }
        }
        filters.name = {
            [Op.iLike]: `%${productName}%`,
        }
        let defaultOrder =  order ? order : 'ASC'
        let defaultSort = sort ? sort : 'name'

        let orderConfig = sort === 'rating' ? 
            [[{model: Average, as: 'Product_Average'}, 'averageRating', defaultOrder]] : 
            [[defaultSort, defaultOrder]]
        
            const product = await Product.findAll({
            where: filters,
            include:[
                {
                    model: PresentationType,
                    as: 'Product_PresentationType',
                    attributes: ['type']
                },
                {
                    model: Drug,
                    attributes: ['name'],
                    through: {attributes: []},
                },
                {
                    model: Laboratory,
                    as: 'Product_Laboratory',
                    attributes: ['name']
                },
                {
                    model: Average,
                    as: 'Product_Average',
                    attributes: ['averageRating']
                }
            ],
            order: orderConfig
        });
        if(!product.length) {
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({error: `Something went wrong: ${error.message}`});
    }
}

module.exports = getProductByName