const {PresentationType} = require('../../db');

async function postPresentationType(req, res){
  try {
    const {name} = req.body;
    if(!name) {
      return res.status(401).json({error: 'Mandatory data is missing'})
    }
    const [presentationType, created] = await PresentationType.findOrCreate({where: {type: name}});
    if(created) {
        return res.status(200).json(presentationType)
    } else {
        return res.status(403).json({error: `Presentation type name: ${name}, already exist`})
    }
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = postPresentationType;