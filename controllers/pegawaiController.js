const { Pegawai } = require('../models');
const factory = require('./handlerFactory');

exports.getAllPegawai = factory.findAll(Pegawai);
exports.createPegawai = factory.createOne(Pegawai);
exports.getPegawai = factory.findOne(Pegawai);
exports.updatePegawai = factory.updateOne(Pegawai);
exports.deletePegawai = factory.deleteOne(Pegawai);
