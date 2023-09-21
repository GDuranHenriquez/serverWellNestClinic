const nodemailer = require('nodemailer');
require('dotenv').config();


const {MAIL, ADDRESS_MAIL} = process.env

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: ADDRESS_MAIL,
    pass: MAIL
  }
});

transporter.verify().then(() => {
  console.log('Ready for send emails')
});

async function sendMailLogin(name, lastName,emailUser){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "🎉 WellNest clinic session start 🎉", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, Welcome back to Wellnest Clinic</b>`, // html body
  });
}

async function sendMailNewUser(name, lastName,emailUser){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "🎉 Welcome to WellNest Clinic! 🎉", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<b>Hello ${name} ${lastName}, Welcome to Wellnest Clinic</b>`, // html body
  });
}

async function sendMailAppointment(name, lastName, emailUser, doctorName, doctorLastName, speciality, date){
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`, // sender address
    to: emailUser, // list of receivers
    subject: "You have a date! 👀🏥", // Subject line
    //text: `Hello ${name} ${lastName}, Welcome back to Wellnest Clinic`, // plain text body
    html: `<br>Hello ${name} ${lastName}, we hope you are having a good time.</br> You have a new appointment with the ${speciality} ${doctorName} ${doctorLastName} on ${date}. </br> Please don't forget be 15 min before the appointment⏰ </b>`, // html body
  });
}

async function sendBillPharmacyToUser(name, emailUser, sale, date, products, price, discount, totalPrice){
  let bodyStart = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Bill</title>
      <style>
          body {
              font-family: Arial, sans-serif;
          }
          .hi p {
            font-size: 16px;
            color: #555;
          }
  
          .invoice {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
          }
  
          .invoice h1 {
              font-size: 24px;
              color: #333;
          }
  
          .invoice p {
              font-size: 16px;
              color: #555;
          }
  
          .invoice .invoice-details {
              margin-top: 20px;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ddd;
          }
  
          .invoice .invoice-details table {
              width: 100%;
              border-collapse: collapse;
          }
  
          .invoice .invoice-details th,
          .invoice .invoice-details td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
          }
  
          .invoice .invoice-details th {
              background-color: #f4f4f4;
          }
  
          .invoice .total {
              margin-top: 20px;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ddd;
              text-align: right;
          }
      </style>
  </head>
  <body>
      <h3>Hello ${name}, we hope you are having a good time.<br> Here is your purchase info:</h3>
      <div class="invoice">
        
          <h1>Bill</h1>
          <p>Date: ${date}</p>
          <p>Order Number: ${sale}</p>
  
          <div class="invoice-details">
              <table>
                  <tr>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Unit price</th>
                      <th>Total</th>
                  </tr>`
  let productBody = await products.map((product) =>( 
    `<tr>
      <td>${product.name} ${product.dose}</td>
      <td>${product.amount}</td>
      <td>$${product.price}</td>
      <td>${Math.round((product.price * product.amount) * 100) / 100}</td>
    </tr>`
  ))
  let discountAmount = Math.round((price * discount) * 100) / 100
  let body = bodyStart.concat(
    productBody.join(''),
        `</table>
        </div>

        <div class="total">
            <p>Subtotal: $${price}</p>
            <p>Discount: - $${discountAmount}</p>
            <p><b>Total: $${totalPrice}</b></p>
        </div>
    </div>
    </body>
    </html>`
  )
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`,
    to: emailUser,
    subject: `Hi ${name}! this is your bill! 👀🏥`,
    html: body
  });
}

async function sendPasswordChangeAlert(name, emailUser) {
  const info = await transporter.sendMail({
    from: `WellNest Clinic <${ADDRESS_MAIL}>`,
    to: emailUser,
    subject: `Password changed 🔑✅`,
    html: `<b>Hi ${name}, your password has been successfully changed.<br> If it wasn't you please contact us as soon as possible.</b>`
  })
}

module.exports = {sendMailLogin, sendMailNewUser, sendMailAppointment, sendBillPharmacyToUser, sendPasswordChangeAlert}