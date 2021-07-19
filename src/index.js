console.log("hello-world");
import axios from "axios";
import { GraphQLServer } from "graphql-yoga";

const HOST_URL = 'http://localhost:3004'

const server = new GraphQLServer({
  typeDefs: `
    type Query {
      user(userId: Int!): User!
      users(name:[String], age:[Int]): [User!]
      post(postId: Int!): Post!      
      posts: [Post!]!
    }

    type User {
      id: ID!
      name: String!
      age: Int
      married: Boolean
      average: Float
      status: String
      posts: [Post!]!
    }

    type Post {
      id: ID!
      title: String!
      content: String!
      author: User!
      picture: ID
      
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
      post: async (parent, args, context, info) => {
        const response = await axios.get(HOST_URL + '/posts/' + args.postId)
        return response.data;
      },
      posts: async () => {
        const response = await axios.get(HOST_URL + `/posts`)
        return response.data;
      }
    },
    Post: {
      author: async (parent, args, context, info) => {
        const response = await axios.get(HOST_URL + '/users/' + parent.author)
        return response.data;
      },
    },
    User: {
      posts: async (parent, args, context, info) => {
        const response = await axios.get(HOST_URL + '/posts/?author=' + parent.id)
        return response.data;
      }
    }
  }
});

server.start(() => {
  console.log("running...")
})
