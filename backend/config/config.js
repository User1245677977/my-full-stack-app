//config.js

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'u8m4lr3njuuh62',
    password: process.env.DB_PASSWORD || 'pd95086458e6ba1f98ef1c7c4599bffd7a0bc32ae4fdcc0960f8f999833498162',
    database: process.env.DB_NAME || 'ddgfq2lnkkpmgj',
    host: process.env.DB_HOST || 'c3nv2ev86aje4j.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    dialect: 'postgres', // Changed to 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || 'u8m4lr3njuuh62',
    password: process.env.DB_PASSWORD || 'pd95086458e6ba1f98ef1c7c4599bffd7a0bc32ae4fdcc0960f8f999833498162',
    database: process.env.DB_NAME || 'ddgfq2lnkkpmgj',
    host: process.env.DB_HOST || 'c3nv2ev86aje4j.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    dialect: 'postgres', // Changed to 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres', // Ensure it's 'postgres'
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  // Ensure SSL is handled correctly
      },
    },
  },
};

