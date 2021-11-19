const express = require("express");
const cookieParser = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middlewares/isAuth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const history = require("connect-history-api-fallback");

app.use(isAuth);
const context = (req) => {
  const token = req.headers.token;
  if (!token) {
    return { user: "!token" };
  }
  return { user: "token" };
};

app.use(
  "/graphql",
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true,
      context: { req, res },
    };
  })
);

//production
app.use(history());
app.use("/", express.static("../client/build"));
const port = process.env.PORT || 3001;
mongoose
  .connect(
    "mongourl"
  )
  .then(() => {
    console.log("db connected");
    app.listen(port, () => console.log(`Server is Up and Running On ${port}`));
  })
  .catch((err) => console.log(err));
