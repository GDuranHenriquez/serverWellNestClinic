const { UserClient } = require('../../db');
const { encrypPass } = require('../../utils/crypPass.js');
const { validateUserName } = require('../../utils/validateUserName');

async function posRegisterAcountUser(req, res){
  try {
    const { email, password, id } = req.body;

    if( !id || !email || !password){
      return res.status(403).json({error: 'mandatory data is missing'})
    };

    if(password.length >= 8 && password.length <= 32 ){
      return res.status(403).json({error: 'password must be between 8 and 32 characters'});
    };

    const passCrypt = await encrypPass(password);
    //const compare = bcrypt.compareSync(password, userPass);
    const isValidEmail = await validateUserName(email);

    if(!isValidEmail){
      return res.status(403).json({error: 'This email address is already registered'});
    };
    
    const registerAcountUser = await UserClient.update({password: passCrypt,
      emailRegister: email}, {
        where:{
          id:id
        }
      })

    return res.status(200).json(registerAcountUser);

  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = { posRegisterAcountUser };