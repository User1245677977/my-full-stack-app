//config.js

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'ue4clvdek4525j',
    password: process.env.DB_PASSWORD || 'p0cbefd15187ad0c349d6db85bd0735b63c58701aec4f18c00f0cddc569d89026',
    database: process.env.DB_NAME || 'd8ch2lf0g026bu',
    host: process.env.DB_HOST || 'c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'u8m4lr3njuuh62',
    password: process.env.DB_PASSWORD || 'pd95086458e6ba1f98ef1c7c4599bffd7a0bc32ae4fdcc0960f8f999833498162',
    database: process.env.DB_NAME || 'ddgfq2lnkkpmgj',
    host: process.env.DB_HOST || 'c3nv2ev86aje4j.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: DATABASE_URL,
    dialect: postgres,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    },
  },
};
