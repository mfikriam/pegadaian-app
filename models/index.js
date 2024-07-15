const { Sequelize } = require('sequelize');
const nasabahLamaSchema = require('./nasabahLamaModel');
const nasabahBaruSchema = require('./nasabahBaruModel');

// Connect to Database
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  logging: false,
});

const NasabahLama = sequelize.define('nasabah_lama', nasabahLamaSchema, {
  underscored: true,
  timestamps: false,
});

const NasabahBaru = sequelize.define('nasabah_baru', nasabahBaruSchema, {
  underscored: true,
  timestamps: false,
});

module.exports = { sequelize, NasabahLama, NasabahBaru };
