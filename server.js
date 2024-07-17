// Import dotenv and run its configurations
require('dotenv').config();

// Shut down when uncaught exception appear
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});

// Import App.js
const app = require('./app');

const { sequelize } = require('./models');
const db = require('./utils/db');

// Check Database Connection
db.checkConnection(sequelize);

// Synchronize Database
db.syncDB(sequelize); //? Create if not exist
// db.forceSyncDB(sequelize); //? Drop and create
// db.alterSyncDB(sequelize); //? Alter if changed

// Start Server
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Shut down when unhandled rejection appear
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
