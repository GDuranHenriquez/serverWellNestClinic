const { UserClient } = require('../../db');
const bcrypt = require('bcrypt');
const { createAccessToken,  createRefreshToken } = require('../../auth/createTokens');
const { generateInfo } = require('../../auth/generateTokens');
const { verify } = require('../../auth/verifyGLTK');

async function postLoginUserClient(req, res){
  try {
    const { userName, dni, password, token } = req.body;

    if(token){
      const payload = await verify(token);
      const email = payload.email;
      const user = await UserClient.findOne({ where: { emailRegister : email } });
      if(user === null){
        return res.status(403).json({error: 'Unregistered member, please create an account, go to create an account to register. '});
      }
      var data = user.dataValues;

      if(data.emailRegister === email){   

        const accessToken = createAccessToken(data);
        const refreshToken = await createRefreshToken(data);      
  
        return res.status(200).json({
          pass: true, 
          message: 'Correct username and password', 
          user: generateInfo(data),
          accessToken,
          refreshToken
         })
      }else{
        return res.status(403).json({pass: false, message: "User account no register"})
      }

    }

    const user = await UserClient.findOne({ where: { dni: dni } });
    if(user === null){
      return res.status(403).json({error: 'This ID is not registered as a member, please verify it is correct or request a membership'});
    }else if(user.emailRegister === null){
      return res.status(403).json({error: 'Unregistered member, to register first create an account'});
    }
    var data = user.dataValues;    
    const match = await bcrypt.compare(password, data.password);
   
    if(match && data.emailRegister === userName){   

      const accessToken = createAccessToken(data);
      const refreshToken = await createRefreshToken(data);      

      return res.status(200).json({
        pass: true, 
        message: 'Correct username and password', 
        user: generateInfo(data),
        accessToken,
        refreshToken
       })
    }else{
      return res.status(403).json({pass: false, message: "Incorrect password or user"})
    }
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = { postLoginUserClient };