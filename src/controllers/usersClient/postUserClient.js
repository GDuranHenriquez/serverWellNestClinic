const { UserClient, Plan, DniType } = require('../../db.js')
const getTodayCountry = require('../../utils/getHourCountry.js');

async function postUserClient(req, res){
  try {
    const country = "America/Argentina/Buenos_Aires";
    const todayCountry = getTodayCountry(country);
            
    const { name, lastName, email, dni, dniType, birthDate, address, upToDate, backupContact,  imageUrl, plan } = req.body;

    const upToDateUserClient = new Date(upToDate);

    
    if(!name || !lastName || !email || !dni || !birthDate || !address || !upToDate || !backupContact || !Number(plan) || !Number(dniType)){
      return res.status(403).json({error: 'Mandatory data is missing o exist one invalid data'})
    };

    //User -> Plan. belongsTo

    if(upToDateUserClient.getTime() <= todayCountry.getTime()){
      return res.status(403).json({error:'The end date of the plan cannot be less than the current date'});
    };

    const planClient = await Plan.findByPk(plan);
    const dniTypeClient = await DniType.findByPk(dniType);
    
    if(planClient === null || dniTypeClient === null){
      return res.status(400).json({error: 'This plan is not registered'});
    }
    
    const newUserClient = await UserClient.create({
      name: name, lastName:lastName, email:email, dni:dni,  birthDate:birthDate, address:address, upToDate:upToDate, backupContact:backupContact,  imageUrl:imageUrl, id_plan: plan, id_dniType: dniType
    });

    const resUser = { id:newUserClient.id, name:newUserClient.name, 
      lastName:newUserClient.lastName, 
      email:newUserClient.email,
      dni:newUserClient.dni,
      dniType:dniTypeClient,
      birthDate:newUserClient.birthDate,
      address:newUserClient.address,
      upToDate:newUserClient.upToDate,
      backupContact:newUserClient.backupContact,
      imageUrl:newUserClient.imageUrl,
      plan: planClient}
    
    return res.status(200).json(resUser);
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = { postUserClient };