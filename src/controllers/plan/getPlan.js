const {Plan} = require('../../db');
const { Op } = require('sequelize');

async function getPlan(req, res){
  try {
    const {id, name} = req.query;
    if(id){
      const plan = await Plan.findByPk(id);
      if(plan === null){
        return res.status(200).json({});        
      }
      return res.status(200).json(plan);
    }else if(name){
      const plan = await Plan.findOne({  where:{
        [Op.or]:[
          {
            name:{
              [Op.iLike]: `%${name.toLowerCase()}%`
            }
          }
        ]
        
      }});
      if(plan === null){
        return res.status(200).json({});        
      }
      return res.status(200).json(plan);
    }
    const plan = await Plan.findAll();
    return res.status(200).json(plan);
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

module.exports = { getPlan };