const { UserClient } = require('../../db');
const { validateUserName } = require('../../utils/validateUserName');
const { encrypPass } = require('../../utils/crypPass.js');
const bcrypt = require('bcrypt');

async function postLoginUserClient(req, res){
  try {
    const { userName, dni, password } = req.body;

    const user = await UserClient.findOne({ where: { dni: dni } });
    if(user === null){
      return res.status(403).json({error: 'This ID is not registered as a member, please verify it is correct or request a membership'});
    }else if(user.emailRegister === null){
      return res.status(403).json({error: 'Unregistered member, please create an account, go to create an account to register. '});
    }
    var data = user.dataValues;    
    const match = await bcrypt.compare(password, data.password);
   
    if(match && data.emailRegister === userName){
      return res.status(200).json({pass: true, message: 'Correct username and password', id:user.id})
    }else{
      return res.status(403).json({pass: false, message: "Incorrect password or user"})
    }
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = { postLoginUserClient };