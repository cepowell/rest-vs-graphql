const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.send("Want to know if there's queer representation in that piece of media? Welcome to Do the Lesbians Die.");
});

require('./routes/media-item.routes.js')(app);
require('./routes/comment.routes.js')(app);

app.listen(port, () => {
  console.log("Running app on port " + port);
});

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'Media Items API',
    description: 'API to support the Do The Lesbians Die application',
    version: '1.0.0'
  },
  host: 'localhost:8080',
  basePath: '/',
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    'express-rest/routes/media-item.routes.js',
    'express-rest/routes/comment.routes.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
