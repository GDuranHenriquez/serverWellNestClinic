const nodemailer = require('nodemailer');
const { UserClient, Appointment, Doctor } = require(`../db`)


// Ruta para el envío del detalle de la cita al correo


const SettingMessages =  async (IduserClient, Date, startTime, DoctorName )=>{
  const User = await UserClient.findByPk(IduserClient)
  const Doctor = await Doctor.findByPk(DoctorName)
  
  

  const transporter = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  auth: {
    user: 'wellnestclinic.pf@gmail.com',
    pass: 'enodkstururrxpwd'
  }
});


let mensaje = `Hi ${User.name}, thanks for trust in WellNestClinic, 
your date day is  ${Date}: ${startTime} with the doctor ${Doctor.name}`;

let mailOptions = {
  from: 'wellnestclinic.pf@gmail.com',
  to: `${User.emailRegister}`,
  subject: 'WellNestClinic',
  text: mensaje
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email send: ' + info.response);
  }
});}


// Ruta para el saludo de bienvenida al nuevo User

const transporter2 = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  auth: {
    user: 'wellnestclinic.pf@gmail.com',
    pass: 'enodkstururrxpwd'
  }
});

let mensaje2 = `Hi ${UserClient.name}, ¡Welcome to WellNestClinic!`;

const mailOptions2 = {
  from: 'wellnestclinic.pf@gmail.com',
  to: `${UserClient.emailRegister}`,
  subject: 'Welcome to WellNestClinic',
  text: mensaje2
};

transporter2.sendMail(mailOptions2, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email send: ' + info.response);
  }
});

module.exports = {SettingMessages};