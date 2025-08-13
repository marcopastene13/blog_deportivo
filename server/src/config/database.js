// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.BLOG_DB,       // nombre de la base de datos
  process.env.DB_USER,       // usuario de la base de datos
  process.env.DB_PASSWORD,   // contraseña del usuario
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,          // desactiva logs SQL, cambia a true para debugging
  }
);

module.exports = sequelize;
