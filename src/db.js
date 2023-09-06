require('dotenv').config();
const { Sequelize } =require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  define: {
    freezeTableName: true, // Evitar que Sequelize pluralice automáticamente el nombre de la tabla
  },
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);


sequelize.models = Object.fromEntries(capsEntries);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  UserClient,
  Plan,
  Appointment,
  Doctor,
  Location,
  Speciality,
  Product,
  PresentationType,
  Drug,
  Laboratory,
  Sale,
  DetailSale,
  DniType,
  Puntuation
} = sequelize.models;

// N:M
// al pasarle la propiedad timestamps false ya se define que no se creen las propiedades createdAt y updatedAt
Doctor.belongsToMany(Location, {through: "doctor_location", timestamps: false})
Location.belongsToMany(Doctor, {through: "doctor_location", timestamps: false})
Doctor.belongsToMany(Speciality, {through: "doctor_speciality", timestamps: false})
Speciality.belongsToMany(Doctor, {through: "doctor_speciality", timestamps: false})
Product.belongsToMany(Drug, {through: "product_drug", timestamps: false})
Drug.belongsToMany(Product, {through: "product_drug", timestamps: false})
Product.belongsToMany(DetailSale, {through: "product_detailSale", timestamps: false})
DetailSale.belongsToMany(Product, {through: "product_detailSale", timestamps: false})

// 1:1
//add one key PlanId or id_plan to the table UserClient, according to configuration
UserClient.belongsTo(Plan, {as:'UserClient_Plan', foreignKey: 'id_plan'});

UserClient.belongsTo(DniType, {as:'UserClient_DniType', foreignKey: 'id_dniType'});

Appointment.belongsTo(UserClient, {as:'Appointment_UserClient', foreignKey: 'userClient'});

Appointment.belongsTo(Doctor, {as:'Appointment_Doctor', foreignKey: 'doctor'});

Appointment.belongsTo(Location, {as:'Appointment_Location'});

Sale.belongsTo(UserClient, {as:'Sale_UserClient'});

DetailSale.belongsTo(Sale, {as:'DetailSale_Sale'});

Product.belongsTo(Laboratory, {as:'Product_Laboratory', foreignKey: 'laboratory'});

Product.belongsTo(PresentationType, {as:'Product_PresentationType', foreignKey: 'presentationType'});

Puntuation.belongsTo(Product, {as:'Puntuation_Product', foreignKey: "product"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};