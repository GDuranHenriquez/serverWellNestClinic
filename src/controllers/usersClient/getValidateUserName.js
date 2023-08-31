const { validateUserName } = require('../../middleware/validateUserName');

async function getValidateUsername(req, res){
  try {
    const userName = req.query.userName;
    const available = await validateUserName(userName);

    res.status(200).json({available: available})

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { getValidateUsername };