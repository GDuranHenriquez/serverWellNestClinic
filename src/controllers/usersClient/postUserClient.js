const { UserClient, Plan } = require('../../db.js')
const getTodayCountry = require('../../middleware/getHourCountry.js');

async function postUserClient(req, res){
  try {
    const country = "America/Argentina/Buenos_Aires";
    const todayCountry = getTodayCountry(country);
            
    const { name, lastName, email, password, dni, dniType, birthDate, address, upToDate, backupContact,  imageUrl, plan } = req.body;

    const upToDateUserClient = new Date(upToDate);

    
    if(!name || !lastName || !email || !password || !dni || !dniType || !birthDate || !address || !upToDate || !backupContact || !plan){
      return res.status(400).json({error: 'mandatory data is missing'})
    };

    //User -> Plan. belongsTo

    if(upToDateUserClient.getTime() <= todayCountry.getTime()){
      return res.status(400).json({error:'The end date of the plan cannot be less than the current date'});
    };

    const planClient = await Plan.findByPk(plan);
    
    if(planClient === null){
      return res.status(400).json({error: 'this plan is not registered'});
    }
    
    const newUserClient = await UserClient.create({
      name: name, lastName:lastName, email:email, password:password, dni:dni, dniType:dniType, birthDate:birthDate, address:address, upToDate:upToDate, backupContact:backupContact,  imageUrl:imageUrl, id_plan: plan
    });
    
    return res.status(200).json(newUserClient);
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = { postUserClient };