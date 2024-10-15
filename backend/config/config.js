module.exports = {
  development: {
    username: process.env.DB_USERNAME || "ka0a54erd9z2becm",
    password: process.env.DB_PASSWORD || "pt91iuay7r6lz61m",
    database: process.env.DB_NAME || "k074fnbxna9d128p",
    host: process.env.DB_HOST || "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME || "ka0a54erd9z2becm",
    password: process.env.DB_PASSWORD || "pt91iuay7r6lz61m",
    database: process.env.DB_NAME || "k074fnbxna9d128p",
    host: process.env.DB_HOST || "p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
  production: {
    use_env_variable: 'JAWSDB_URL',  // Ensure this is set correctly
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
