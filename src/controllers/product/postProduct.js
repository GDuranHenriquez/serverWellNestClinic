const { Product, Laboratory, PresentationType, Drug, Average } = require("../../db.js")
const postProduct = async(req, res)=>{

try {
    const { name, description, laboratory, presentation, drugs, amount, dose,  imageUrl, stock, price, needPrescription } = req.body;
    if( !name || !description || !laboratory || !presentation || !amount || !dose ||  !imageUrl || !stock || !price || !drugs.length){
      return  res.status(400).json({error: "Mandatory data is missing"})
    }
    const product = await Product.create({
        name,
        description,
        amount,
        dose,
        imageUrl,
        stock,
        price,
        needPrescription,
    });
    await product.setProduct_PresentationType(presentation);
    await product.setProduct_Laboratory(laboratory);
    await product.addDrug(drugs)
    const average = await Average.create()
    await product.setProduct_Average(average)
    const response = await Product.findOne({
        where: {id: product.id},
        include: [
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
            {
                model: Average,
                as: 'Product_Average',
                attributes: ['averageRating']
            }
        ]
    })
    return res.status(200).json(response)
} catch (error) {
    res.status(500).json({error:error.message})
}}

module.exports = {postProduct};



