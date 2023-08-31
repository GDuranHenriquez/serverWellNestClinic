const { UserClient, Plan } = require('../../db');
const { Op } = require('sequelize');

async function getUserClient(req, res){
  try {
    const id = req.query.id;
    const name = req.query.name;
    //return res.status(200).json(id);
    if(id){
      const userClient = await UserClient.findByPk(id);
      if(userClient === null){
        res.status(200).json([]);
      }else{
        res.status(200).json(userClient);
      };
    }if(name){
      const userClient = await UserClient.findAll({
        where:{
          [Op.or]:[
            {
              name:{
                [Op.iLike]: `%${name}%`
              }
            },
            {
              lastName: {
                [Op.iLike]: `%${name}%`
              }
            }
          ]
          
        }
      });

      if(userClient === null){
        res.status(200).json([]);
      }else{
        res.status(200).json(userClient);
      };
    }else{
      const allUserClient = await UserClient.findAll();
      return res.status(200).json(allUserClient);
    };
    
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = {getUserClient};