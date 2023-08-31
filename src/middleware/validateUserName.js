const { UserClient } = require('../db');

async function validateUserName(username){
    const isValidUserName = await UserClient.findOne({ where: { emailRegister: username } });
    if(isValidUserName === null){
      return true;
    }else{
      return false;
    }
};

module.exports = { validateUserName }