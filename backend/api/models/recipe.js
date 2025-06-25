const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.JSON,
    allowNull: false
  },
  prepTime: DataTypes.STRING,
  method: DataTypes.TEXT,
  imageUrl: DataTypes.STRING
});

module.exports = Recipe;