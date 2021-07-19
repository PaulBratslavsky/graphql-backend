import { GraphQLServer } from "graphql-yoga";
import { Query, User, Post, Picture } from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",

  resolvers: {
    Query,
    User,
    Post,
    Picture,
  }
});

server.start(() => {
  console.log("running...")
})
