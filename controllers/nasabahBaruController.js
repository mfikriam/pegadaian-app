const { NasabahBaru } = require('../models');
const factory = require('./handlerFactory');

exports.getAllNasabahBaru = factory.findAll(NasabahBaru);
exports.createNasabahBaru = factory.createOne(NasabahBaru);
exports.getNasabahBaru = factory.findOne(NasabahBaru);
exports.updateNasabahBaru = factory.updateOne(NasabahBaru);
exports.deleteNasabahBaru = factory.deleteOne(NasabahBaru);
