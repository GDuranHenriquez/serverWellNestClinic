const {Plan} = require('../../db');

async function postPlan(req, res){
  try {
    const {name, discount} = req.body; 
    const plans = ['gold','bronze','silver'];

    if(plans.includes(name.toLowerCase())){

      const [findplan, created] = await Plan.findOrCreate({where: { name: name.toLowerCase() },
        defaults: {discount: discount}
    });
      if (created) {
        return res.status(200).json(findplan);
      } else {
        return res.status(409).json({
          error: "Plan duplication",
          message: `Plan, ${name} is already registered`});
      }      
    }else{
      return res.status(400).json({
        error: "request not valid",
        message: `Plan name: ${name}, is not allowed to be registered`});
    };    
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postPlan};