const AppError = require('../utils/appError');

const handleValidationErrorDB = (err) => {
  const message = 'Invalid data';
  const validationError = err.errors.map((el) => {
    return {
      field: el.path,
      message: `${el.message.split('.')[1]} cannot be null`,
      value: el.value,
    };
  });
  return new AppError(message, 400, validationError);
};

const handleUniqueConstraintErrorDB = (err) => {
  const message = 'Duplicate data';
  const validationError = err.errors.map((el) => {
    if (el.message.split('_').length === 1) {
      return {
        field: el.path,
        message: el.message,
        value: el.value,
      };
    }

    if (el.message.split('_').length > 4) {
      return {
        field: el.path.split('_').slice(2).join(' '),
        message: el.message.split('_').slice(2).join(' '),
        value: el.value,
      };
    }

    return {
      field: el.path.split('_')[1],
      message: `${el.message.split('_')[1]} must be unique`,
      value: el.value,
    };
  });
  return new AppError(message, 400, validationError);
};

const handleAggregateErrorDB = (err) => {
  const message = 'Invalid data';
  const validationError = [];

  err.errors.forEach((subErr) => {
    if (subErr.name === 'SequelizeBulkRecordError') {
      subErr.errors.errors.forEach((el) => {
        validationError.push({
          field: el.path,
          message: el.message,
          value: el.value,
        });
      });
    }
  });

  return new AppError(message, 400, validationError);
};

const handleFKConstraintErrorDB = (err) =>
  new AppError(`Invalid data: ${err.table} id is not found. Please insert existed ${err.table} id!`, 404);

const handleSequelizeDBError = () => new AppError('Database error: please contact the admin!', 500);

const handleJWTError = () => new AppError('Invalid token. Plase log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired!. Plase log in again!', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // console.log(err);
  // console.log('\nError Name: ', err.name, '\n');
  // console.log('\nTable Name: ', err.table, '\n');
  // console.log(err.errors);
  // console.log(err.errors[0].message);
  // console.log(err.stack);
  // console.log(err.name);

  let error = Object.create(err);

  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  if (error.name === 'SequelizeForeignKeyConstraintError') error = handleFKConstraintErrorDB(error);
  if (error.name === 'SequelizeDatabaseError') error = handleSequelizeDBError();
  if (error.name === 'SequelizeValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'SequelizeUniqueConstraintError') error = handleUniqueConstraintErrorDB(error);
  if (error.name === 'AggregateError') error = handleAggregateErrorDB(error);

  return res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    validationError: error.validationError,
    // stack: error.stack,
  });
};
