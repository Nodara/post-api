module.exports = {
  database: process.env.DB_SCHEMA,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_TYPE,
  host: process.env.DB_HOST,
};
