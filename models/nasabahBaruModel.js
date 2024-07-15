const { DataTypes } = require('sequelize');

const nasabahBaruSchema = {
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
  prediksi_potensial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  akurasi: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
};

module.exports = nasabahBaruSchema;
