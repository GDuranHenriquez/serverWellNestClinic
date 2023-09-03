const {Plan} = require('../../db');

async function postPlan(req, res){
  try {
    const plan = req.query.plan;
    
    const plans = ['gold','bronze','silver'];
    if(plans.includes(plan.toLowerCase())){
      const existePlan = await Plan.findOne({where: { name: plan.toLowerCase() }});
      if (existePlan === null) {
        var addPlan = await Plan.create({name: plan.toLowerCase()});
        return res.status(200).json(addPlan);
      } else {
        return res.status(403).json({error: 'Plan is already registered'});
      }
      
    }else{
      return res.status(400).json({error: 'Plan not allowed in previuos configuration'});
    };    
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postPlan};