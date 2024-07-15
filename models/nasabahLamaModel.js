const { DataTypes } = require('sequelize');

const nasabahLamaSchema = {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pendapatan: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  utang: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  riwayat_pembayaran: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  potensial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = nasabahLamaSchema;
