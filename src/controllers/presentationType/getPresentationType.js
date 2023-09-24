const { PresentationType } = require("../../db")
const getPresentationType = async (req, res) => {
    try {
        const presentationTypes = await PresentationType.findAll();
        return res.status(200).json(presentationTypes);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
module.exports = getPresentationType;