console.log("hello-world");
import axios from "axios";
import { GraphQLServer } from "graphql-yoga";

const HOST_URL = 'http://localhost:3004'

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      user(userId: Int!): User!
      users(name:[String], age:[Int]): [User!]
    }

    type User {
      id: ID!
      name: String!
      age: Int
      married: Boolean
      average: Float
      status: String
    }
  `,

  resolvers: {
    Query: {
      user: async (parent, args, context, info) => {
        const response = await axios.get(HOST_URL + '/users/' + args.userId)
        return response.data;
      }, 
      users: async (parent, args, context, info) => {
        const name = args.name != null ? `name=${args.name}` : '';
        const age = args.age != null ? `age=${args.age}` : '';
        const response = await axios.get(HOST_URL + `/users?${name}&${age}`)
        return response.data;
      },
    }
  }
});

server.start(() => {
  console.log("running...")
})
