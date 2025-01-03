//config.js

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'ue4clvdek4525j',
    password: process.env.DB_PASSWORD || 'p0cbefd15187ad0c349d6db85bd0735b63c58701aec4f18c00f0cddc569d89026',
    database: process.env.DB_NAME || 'd8ch2lf0g026bu',
    host: process.env.DB_HOST || 'c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.DB_USERNAME || 'ue4clvdek4525j',
    password: process.env.DB_PASSWORD || 'p0cbefd15187ad0c349d6db85bd0735b63c58701aec4f18c00f0cddc569d89026',
    database: process.env.DB_NAME || 'd8ch2lf0g026bu',
    host: process.env.DB_HOST || 'c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
