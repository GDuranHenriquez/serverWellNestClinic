require('dotenv').config();
const { Sequelize } =require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
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
  User,
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
  DetailSale
} = sequelize.models

// N:M
Doctor.belongsToMany(Location, {throught: "doctor_location"})
Location.belongsToMany(Doctor, {throught: "doctor_location"})
Doctor.belongsToMany(Speciality, {throught: "doctor_speciality"})
Speciality.belongsToMany(Doctor, {throught: "doctor_speciality"})
Product.belongsToMany(Drug, {throught: "product_drug"})
Drug.belongsToMany(Product, {throught: "product_drug"})
Product.belongsToMany(DetailSale, {throught: "product_detailSale"})
DetailSale.belongsToMany(Product, {throught: "product_detailSale"})

// 1:N
Plan.hasMany(User)
User.hasMany(Appointment)
Doctor.hasMany(Appointment)
User.hasMany(Sale)
Sale.hasMany(DetailSale)
Laboratory.hasMany(Product)
PresentationType.hasMany(Product)
Location.hasMany(Appointment)

// 1:1
User.belongsTo(Plan)
Appointment.belongsTo(User)
Appointment.belongsTo(Doctor)
Sale.belongsTo(User)
DetailSale.belongsTo(Sale)
Product.belongsTo(Laboratory)
Product.belongsTo(PresentationType)
Appointment.belongsTo(Location)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};