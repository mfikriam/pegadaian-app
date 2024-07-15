class AppError extends Error {
  constructor(message, statusCode, validationError = undefined) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.validationError = validationError;

    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
