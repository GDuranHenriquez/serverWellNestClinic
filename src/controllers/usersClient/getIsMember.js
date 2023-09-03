const { UserClient } = require('../../db');

async function getIsMember(req, res){
  try {
    const dni = req.params.ID;
    const clientMenber = await UserClient.findOne({ where: { dni: dni } });
    if(clientMenber === null){
      return res.status(403).json({response: 'ID not registered as a member', isMember: false});
    }else{
      const data = {
        id: clientMenber.id,
        name: clientMenber.name,
        lastName: clientMenber.lastName
      };
      return res.status(200).json(data);
    }
  } catch (error) {
    
  }
}

module.exports = {getIsMember}