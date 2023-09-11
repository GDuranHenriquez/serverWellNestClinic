const nodemailer = require('nodemailer');
const { UserClient, Doctor } = require(`../db`)


// Ruta para el envío del detalle de la cita al correo


const SettingMessages =  async (IduserClient, Date, startTime, DoctorName )=>{
  const User = await UserClient.findByPk(IduserClient)
  const Doctors = await Doctor.findByPk(DoctorName)
  
  

  const transporter = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'wellnestclinic.pf@gmail.com',
    pass: 'enodkstururrxpwd'
  }
});


let mensaje = `Hi ${User.name}, thanks for trust in WellNestClinic, 
your date day is  ${Date}: ${startTime} with the doctor ${Doctors.name}`;

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

const SettingMessagesWelcome =  async (IduserClient)=>{
  
  const User = await UserClient.findByPk(IduserClient)

  const transporter2 = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'wellnestclinic.pf@gmail.com',
    pass: 'enodkstururrxpwd'
  }
});

let mensaje2 = `Hi ${User.name}, ¡Welcome to WellNestClinic!`;

const mailOptions2 = {
  from: 'wellnestclinic.pf@gmail.com',
  to: `${User.emailRegister}`,
  subject: 'Welcome to WellNestClinic',
  text: mensaje2
};

transporter2.sendMail(mailOptions2, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email send: ' + info.response);
  }
});}

module.exports = {SettingMessages,
                  SettingMessagesWelcome};