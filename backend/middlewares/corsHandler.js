const cors = require('cors');

const corsHandler = cors({
  origin: 'https://ieasyjet.github.io',
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Cookie'],
  credentials: true,
});

module.exports = corsHandler;