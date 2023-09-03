const { Product } = require("../../db.js")
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

    return res.status(200).json(product)
} catch (error) {
    res.status(500).json({error:error.message})
}}

module.exports = {postProduct};



