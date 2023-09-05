const { DniType } = require("../../db");
const { Op } = require('sequelize');

const getDniType = async (req, res) => {
    try {
        const {id, type} = req.query;
        if(id){
            const typeDni = await DniType.findByPk(id);
            if(typeDni === null){
                return res.status(200).json({});        
            }
            return res.status(200).json(typeDni);
        }else if(type){
            const typeDni = await DniType.findOne({  where:{
                [Op.or]:[
                  {
                    type:{
                      [Op.iLike]: `%${type.toUpperCase()}%`
                    }
                  }
                ]
                
              }});
            if(typeDni === null){
                return res.status(200).json({});        
            }
            return res.status(200).json(typeDni);
        }
        
        const typeDni = await DniType.findAll();
        return res.status(200).json(typeDni);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {getDniType};


