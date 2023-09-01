const { Product } = require("../../db.js")


const postProduct = async(req, res)=>{


    try {
       const { name, description, laboratory, type, amount, dose,  imageUrl, stock, price, needPrescription } = req.body;
      if( !name || !description || !laboratory || !type || !amount || !dose ||  !imageUrl || !stock || !price || !needPrescription){
        return  res.status(404).json({error: 'falta información'})
      }

       const product = await Product.create({
           name: name,
           description: description,
           amount: amount,
           dose: dose,
           imageUrl: imageUrl,
           stock: stock,
           price: price,
           needPrescription: needPrescription,
          
       });

       product.addPresentationTypes([...type])
       product.addLaboratorys([...laboratory])
   
       return res.status(200).json(product)
    } catch (error) {
       res.status(404).json({error:error.message})
    }
}


module.exports = {postProduct};



