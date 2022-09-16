const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./src/schema");
const graphQlResolvers = require("./src/resolvers");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yyl4arc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
// const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, options)
  .then(() => app.listen(4001, console.log("Server is listening on 4001")))
  .catch((error) => {
    throw error;
  });
