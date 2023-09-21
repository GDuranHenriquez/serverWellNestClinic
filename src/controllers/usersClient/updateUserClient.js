const {UserClient} = require('../../db')
const bcrypt = require('bcrypt')
const { encrypPass } = require('../../utils/crypPass.js');

async function updateUserClient(req, res) {
    try {
        const {id, imageUrl, password, newPassword} = req.body
        if(!id){
            return res.status(403).json({error: 'Mandatory data is missing'})
        }
        const user = await UserClient.findByPk(id)
        if(!user){
            return res.status(403).json({error: 'Unregistered member, please create an account, go to create an account to register'})
        }
        let dataUpdate = {}
        if(newPassword){
            if(!password) return res.status(403).json({error: 'Mandatory data is missing'})
            const match = await bcrypt.compare(password, user.password)

            if(!match) return res.status(403).json({error: 'Wrong password'})
            
            if(!(newPassword.length >= 8 && newPassword.length <= 32) ){
                return res.status(403).json({error: 'The password must be between 8 and 32 characters'});
            };
            const passCrypt = await encrypPass(newPassword);
            const check = await bcrypt.compare(password, passCrypt)
            console.log(check)
            if(check) return res.status(403).json({error: "The new password must be different from the previous one"})
            
            dataUpdate.password = passCrypt
        }
        if(imageUrl){
            dataUpdate.imageUrl = imageUrl
        }
        const userUpdated = await UserClient.update(dataUpdate, {where:{id:id}})
        return res.status(200).json({userUpdated, imageUrl});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {updateUserClient}