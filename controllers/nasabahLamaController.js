const { NasabahLama } = require('../models');
const factory = require('./handlerFactory');

exports.getAllNasabahLama = factory.findAll(NasabahLama);
exports.createNasabahLama = factory.createOne(NasabahLama);
exports.getNasabahLama = factory.findOne(NasabahLama);
exports.updateNasabahLama = factory.updateOne(NasabahLama);
exports.deleteNasabahLama = factory.deleteOne(NasabahLama);
