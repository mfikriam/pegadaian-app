const { DataTypes } = require('sequelize');

const pegawaiSchema = {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jabatan: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  masa_kerja: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  grade_gaji: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status_nikah: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jumlah_anak: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  hutang_tempat_lain: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  kelayakan: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
};

module.exports = pegawaiSchema;
