const { Sequelize } = require('sequelize');
const pegawaiSchema = require('./pegawaiModel');
const pengajuSchema = require('./pengajuModel');

// Connect to Database
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
    },
    logging: false,
  },
);

const Pegawai = sequelize.define('pegawai', pegawaiSchema, {
  underscored: true,
  timestamps: false,
});

const Pengaju = sequelize.define('pengaju', pengajuSchema, {
  underscored: true,
  timestamps: false,
});

module.exports = { sequelize, Pegawai, Pengaju };
