const { UserClient } = require('../../db');
const { encrypPass } = require('../../middleware/crypPass.js');
const { validateUserName } = require('../../middleware/validateUserName');

async function posRegisterAcountUser(req, res){
  try {
    const { email, password, id } = req.body;

    if( !id || !email || !password){
      return res.status(403).json({error: 'mandatory data is missing'})
    };

    const passCrypt = await encrypPass(password);
    //const compare = bcrypt.compareSync(password, userPass);
    const isValidEmail = await validateUserName(email);

    if(!isValidEmail){
      return res.status(403).json({error: 'This usaurio email is already registered'});
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