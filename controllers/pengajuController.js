const { Pengaju } = require('../models');
const factory = require('./handlerFactory');

exports.getAllPengaju = factory.findAll(Pengaju);
exports.createPengaju = factory.createOne(Pengaju);
exports.getPengaju = factory.findOne(Pengaju);
exports.updatePengaju = factory.updateOne(Pengaju);
exports.deletePengaju = factory.deleteOne(Pengaju);
