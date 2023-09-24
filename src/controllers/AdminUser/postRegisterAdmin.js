const { UserAdmin } = require('../../db');
const { encrypPass } = require('../../utils/crypPass.js');
const { validateUserNameAdmin } = require('../../utils/validateUserName');
const { verify } = require('../../auth/verifyGLTK');
const { generatePassword } = require('../../auth/generatePassword');
const { SettingMessagesWelcome } = require('../../utils/nodemailer')

async function posRegisterAcountUserAdmin(req, res){
  try {
    const { token } = req.body;

    if(token){
      const payload = await verify(token);
      const email = payload.email;
      const isValidEmail = await validateUserNameAdmin(email);
      if(!isValidEmail){
        return res.status(403).json({error: 'This email address is already registered'});
      };

      let nameEmail = payload.name;
      var name = null;
      var lastName = null;
      nameEmail = nameEmail.split(' ');
      if(nameEmail.length >= 2){
        name = nameEmail[0];
        lastName = nameEmail[1];
      }else{
        name = nameEmail[0];
      };
      
      const password = generatePassword();
      const img = payload.picture;
      const passCrypt = await encrypPass(password);      
      
      
      const userAdmin = await UserAdmin.create({name, lastName, email, password: passCrypt, imageUrl: img});

      //SettingMessagesWelcome(userAdmin.id);
      return res.status(200).json({ id: userAdmin.id, name, lastName, email });
    }else {
      return res.status(403).json({error: 'Mandatory data is missing'})
    } 
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = { posRegisterAcountUserAdmin };