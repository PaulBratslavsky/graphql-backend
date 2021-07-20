import { GraphQLServer } from "graphql-yoga";
import { Query, Mutation, User, Post, Picture } from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",

  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Picture,
  }
});

server.start(() => {
  console.log("running...")
})
