const { Speciality } = require("../../db");
const { Op } = require('sequelize');

const getSpecialities = async (req, res) => {
    try {
        const {id, name} = req.query;
        if(id){
            const speciality = await Speciality.findByPk(id);
            if(speciality === null){
                return res.status(200).json({});        
            }
            return res.status(200).json(speciality);
        }else if(name){
            const speciality = await Speciality.findOne({  where:{
                [Op.or]:[
                  {
                    name:{
                      [Op.iLike]: `%${name.toLowerCase()}%`
                    }
                  }
                ]
                
              }});
            if(speciality === null){
                return res.status(200).json({});        
            }
            return res.status(200).json(speciality);
        }
        
        const specialities = await Speciality.findAll();
        return res.status(200).json(specialities);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {getSpecialities};