const { StatusAppointment } = require('../../db');

async function getStatusAppointment(req, res){
  try {
    const {status, id} = req.query;
    if(id){
      const statusAppointment = await StatusAppointment.findByPk(id);
      if(statusAppointment === null){
        return res.status(200).json({});
      }
      return res.status(200).json(statusAppointment);
    }else if(status){
      const statusAppointment = await StatusAppointment.findOne({where: {status: status}});
      if(statusAppointment === null){
        return res.status(200).json({});
      }
      return res.status(200).json(statusAppointment);
    }else{
      const statusAppointment = await StatusAppointment.findAll(id);
      return res.status(200).json(statusAppointment);
    }

  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};


module.exports = { getStatusAppointment }