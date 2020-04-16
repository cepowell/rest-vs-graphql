const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const schema = require('./graphql/schema');

const app = express();
const port = process.env.port || 8080;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(8080, () => {
  console.log("Running on port " + port);
});
