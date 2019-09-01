//Dependencies
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
require("dotenv").config();
const graphqlHTTP = require("express-graphql");
const isAuth = require("./middleware/is-auth");
//Db
const connect = require("./db/database");
//Schemas GraphQL
const schema = require("./graphql/schema");

const app = express();
//DB conection
connect();

//Middlewares
app.use(bodyParser.json());
app.use(isAuth);

//Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//GraphQl
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

// Handle Production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // app.use(express.static(__dirname + "/client/public"));
  app.use(express.static("public"));

  // Handle SPA
  app.get(/.*/, (req, res) =>
    res.sendFile(__dirname + "public/index.html")
  );
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `>>> 🚀 Server running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});
