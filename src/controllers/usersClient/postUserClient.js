const { UserClient, Plan, DniType } = require('../../db.js')
const getTodayCountry = require('../../utils/getHourCountry.js');
const { sendMailNewUser } = require('../../utils/nodemailer')

async function postUserClient(req, res){
  try {
    const country = "America/Argentina/Buenos_Aires";
    const todayCountry = getTodayCountry(country);
            
    const { name, lastName, email, dni, dniType, birthDate, address, upToDate, backupContact,  imageUrl, plan } = req.body;

    const upToDateUserClient = new Date(upToDate);

    
    if(!name || !lastName || !email || !dni || !birthDate || !address || !upToDate || !backupContact || !Number(plan) || !Number(dniType)){
      return res.status(403).json({error: 'Mandatory data is missing or invalid data provided'})
    };

    //User -> Plan. belongsTo

    if(upToDateUserClient.getTime() <= todayCountry.getTime()){
      return res.status(403).json({error:"The plan expiration date can't be less than current date"});
    };

    const planClient = await Plan.findByPk(plan);
    const dniTypeClient = await DniType.findByPk(dniType);
    

    if(planClient === null){
      return res.status(400).json({error: 'This plan is not registered'});
    }
    if(dniTypeClient === null) {
      return res.status(400).json({error: 'The ID Type is not registered'});
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

      sendMailNewUser(newUserClient.name, newUserClient.lastName, newUserClient.email) //nodemailer
    
    return res.status(200).json(resUser);
    
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = { postUserClient };