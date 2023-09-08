const { StatusAppointment } = require('../../db');

async function postStatusAppointment(req, res){
  try {
    const {status} = req.body;
    const statusAppointment = await StatusAppointment.create({status});
    return res.status(200).json(statusAppointment);

  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};


module.exports = { postStatusAppointment }