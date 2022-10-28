const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const migrationConfig = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);

  const migrations = await migrator.up();

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to the database');
    await runMigrations();
  } catch (err) {
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
