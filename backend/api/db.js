'use strict';
const { Sequelize } = require('sequelize');
require('dotenv').config();


// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

// Test connection
const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to MySQL Database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('Unable to connect to MySQL database:', error);
    process.exit(1);
  }
};

connectMysql();

module.exports = sequelize; 