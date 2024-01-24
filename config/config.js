// config/config.js

require('dotenv').config();

module.exports = {
    api: {
      port: process.env.PORT || 5500,
      externalApiBaseUrl: process.env.url,
    },
  };
  