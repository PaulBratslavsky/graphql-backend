import axios from "axios";
const HOST_URL = "http://localhost:3004";

export const Query = {

  user: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/users/" + args.userId);
    return response.data;
  },

  users: async (parent, args, context, info) => {
    const name = args.name != null ? `name=${args.name}` : "";
    const age = args.age != null ? `age=${args.age}` : "";
    const response = await axios.get(HOST_URL + `/users?${name}&${age}`);
    return response.data;
  },

  post: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/posts/" + args.postId);
    return response.data;
  },

  posts: async () => {
    const response = await axios.get(HOST_URL + `/posts`);
    return response.data;
  },

  picture: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/pictures/" + args.postId);
    return response.data;
  },

  pictures: async () => {
    const response = await axios.get(HOST_URL + `/pictures`);
    return response.data;
  },

};

export const Mutation = {

  addUser: async (parent, args, context, info) => {
    const response = await axios.post(`${HOST_URL}/users`, {
      name: args.data.name,
      age: args.data.age,
      married: args.data.married,
      status: args.data.status
    });
    return response.data;
  },

  updateUser: async (parent, args, context, info) => {
    const data = {}

    if (!!args.data.name) data.name = args.data.name;
    if (!!args.data.age) data.age = args.data.age;
    if (!!args.data.status) data.status = args.data.status;
    if (args.data.married !== undefined) data.married = args.data.married;
    
    const response = await axios.patch(`${HOST_URL}/users/${args.id}`, data);
    return response.data;
  },

  addPost: async (parent, args, context, info) => {
    const response = await axios.post(`${HOST_URL}/posts`, {
      title: args.title,
      content: args.content,
      status: args.status,
      author: 1,
      picture: 1,
    });
    return response.data;
  },

  deletePost: async (parent, args, context, info) => {
    const response = await axios.delete(`${HOST_URL}/posts/${args.id}`);
    if (Object.keys(response.data).length === 0) {
      return true;
    }

    return false;
  },

  deleteUser: async (parent, args, context, info) => {
    const response = await axios.delete(`${HOST_URL}/users/${args.id}`);
    
    //TODO: find all posts for this user and delete
    //TODO: find all ppictures for this user and delete
    
    if (Object.keys(response.data).length === 0) {
      return true;
    }

    return false;
  },
};

export const User = {

  posts: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/posts/?author=" + parent.id);
    return response.data;
  },

  pictures: async (parent, args, context, info) => {
    const response = await axios.get(
      HOST_URL + "/pictures/?author=" + parent.id
    );
    return response.data;
  },

};

export const Post = {

  author: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/users/" + parent.author);
    return response.data;
  },

  picture: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/pictures/" + parent.picture);
    return response.data;
  },
};

export const Picture = {

  author: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/users/" + parent.author);
    return response.data;
  },

  post: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/posts/" + parent.post);
    return response.data;
  },

};
