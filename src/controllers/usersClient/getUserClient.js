const { UserClient, Plan } = require('../../db');
const { Op } = require('sequelize');

async function getUserClient(req, res){
  try {
    const {id, name, DNI} = req.query;
    
    //return res.status(200).json(id);
    if(id){
      const userClient = await UserClient.findByPk(id,{
        attributes: ['id', 'name','lastName',
        'email', 'dni', 'dniType', 'birthDate', 'address', 'deleted', 'upToDate', 'backupContact',
        'imageUrl', 'activePlan'],
        include: [
          {model: Plan, as: 'UserClient_Plan', required: false}
        ]});
      if(userClient === null){
        return res.status(200).json([]);
      }else{
        return res.status(200).json(userClient);
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
          
        },
        attributes: ['id', 'name','lastName',
        'email', 'dni', 'dniType', 'birthDate', 'address', 'deleted', 'upToDate', 'backupContact',
        'imageUrl', 'activePlan'],
        include: [
          {model: Plan, as: 'UserClient_Plan', required: false}
        ]
      });

      if(userClient === null){
        return res.status(200).json([]);
      }else{
        return res.status(200).json(userClient);
      };
    }if(DNI){
      const userClient = await UserClient.findOne({
        where: { dni: DNI },
        attributes: ['id', 'name','lastName',
        'email', 'dni', 'dniType', 'birthDate', 'address', 'deleted', 'upToDate', 'backupContact',
        'imageUrl', 'activePlan'],
        include: [
          {model: Plan, as: 'UserClient_Plan', required: false}
        ]});
      if(userClient === null){
        return res.status(200).json([]);
      }else{
        return res.status(200).json(userClient);
      };

    }else{
      const allUserClient = await UserClient.findAll({
        attributes: ['id', 'name','lastName',
      'email', 'dni', 'dniType', 'birthDate', 'address', 'deleted', 'upToDate', 'backupContact',
      'imageUrl', 'activePlan'],
      include: [
        {model: Plan, as: 'UserClient_Plan', required: false}
      ]
    });
      return res.status(200).json(allUserClient);
    };
    
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = {getUserClient};