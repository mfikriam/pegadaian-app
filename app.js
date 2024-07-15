const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const pegawaiRouter = require('./routes/pegawaiRoutes');
const pengajuRouter = require('./routes/pengajuRoutes');

// Start express app
const app = express();

// Implement CORS
app.use(cors());
app.options('*', cors());

// Using pug view engine
app.set('view engine', 'pug');

//  Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', viewRouter);
app.use('/api/v1/pegawai', pegawaiRouter);
app.use('/api/v1/pengaju', pengajuRouter);

// Not Found Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ? Error Handler/Middleware
app.use(globalErrorHandler);

module.exports = app;
