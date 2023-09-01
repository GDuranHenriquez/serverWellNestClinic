const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


//All Routes.
const clientUserRouter = require('./routes/routerUserClient'); 
const planRouter = require('./routes/routerPlan');
const routerDoctor = require("./routes/routerDoctors");
const routerDetailSale = require('./routes/routerDetailSale')
const routerSale = require('./routes/routerSale')

require('./db.js');

const server = express();

server.name = 'API WELLNEST CLINIC';


server.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
server.use(bodyParser.json({ limit: '100mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(cors());

//server.use('/', routes);
server.use('/userClient', clientUserRouter);
server.use('/plan', planRouter);
server.use('/doctor', routerDoctor);
server.use('/detail', routerDetailSale)
server.use('/detailsale', routerSale)


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;