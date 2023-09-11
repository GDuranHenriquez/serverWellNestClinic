const { DniType } = require("../../db");

const postDniType = async (req, res) => {
    try {
        const { type } = req.body;

        if(!type) {
            return res.status(400).json({
                error: "request not valid",
                message: "Mandatory data is missing"});
        };
        
        const [typeRegister, created] = await DniType.findOrCreate({where: {type: type.toUpperCase()}});
        if(created) {
            return res.status(200).json(typeRegister);
        }else{
            return res.status(409).json({
                error: "request not valid",
                message: `ID type: ${type}, already exist`})
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

module.exports = {postDniType};