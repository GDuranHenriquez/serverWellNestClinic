const {Product} = require('../../db')

async function updateProduct(req, res) {
    try {
        const {id, name, description, laboratory, presentation, drugs, amount, dose, imageUrl, stock, price, needPrescription, deleted} = req.body
        if(!id || !name || !laboratory || !presentation || !drugs.length || !amount || !dose || !imageUrl || !stock || !price || !(needPrescription === true || needPrescription === false) || !(deleted === true || deleted === false)){
            return res.status(403).json({error: "Mandatory data is missing"})
        }
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error: "The Id provided doesn't match any product stored"})
        }
        if(product.name === name && product.description === description && product.laboratory === laboratory && product.presentation === presentation && product.amount === amount && product.dose === dose && product.imageUrl === imageUrl && product.stock === stock && product.price === price && product.needPrescription === needPrescription && product.deleted === deleted && drugs.length === product.drugs.length){
            let equal = false
            for(let i = 0; i < drugs.length; i++){
                if(drugs[i] === product.drugs[i]){
                    equal = true
                }
            }
            if(equal){
                return res.status(403).json({error: "At least one change must be made to update a product."})
            }
        }
        
        const newProduct = {
            name,
            laboratory,
            presentation,
            drugs,
            amount,
            dose,
            imageUrl,
            stock,
            price,
            needPrescription,
            deleted
        }
        if(description && description !== ""){
            newProduct.description = description
        }
        await product.update(newProduct)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = updateProduct