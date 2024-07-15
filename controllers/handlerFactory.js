const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const resultQuery = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { [Model.name]: resultQuery.toJSON() },
    });
  });

exports.findAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const resultQuery = await Model.findAll();
    const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

    res.status(200).json({
      status: 'success',
      results: resultQueryArr.length,
      data: { [`${Model.name}s`]: resultQueryArr },
    });
  });

exports.findOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const resultQuery = await Model.findByPk(req.params.id);

    if (!resultQuery) {
      return next(new AppError(`Cannot find ${Model.name} with ID=${req.params.id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: { [Model.name]: resultQuery.toJSON() },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const resultQuery = await Model.findByPk(req.params.id);

    if (!resultQuery) {
      return next(new AppError(`Cannot find ${Model.name} with ID=${req.params.id}`, 404));
    }

    await Model.update(req.body, { where: { id: req.params.id } });

    const updatedData = await Model.findByPk(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { [Model.name]: updatedData.toJSON() },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const resultQuery = await Model.findByPk(req.params.id);

    if (!resultQuery) {
      return next(new AppError(`Cannot find ${Model.name} with ID=${req.params.id}`, 404));
    }

    await Model.destroy({ where: { id: req.params.id } });

    res.status(204).send();
  });
