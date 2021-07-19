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
    console.log(parent, "hello");
    const response = await axios.get(HOST_URL + "/users/" + parent.author);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(HOST_URL + "/posts/" + parent.post);
    return response.data;
  },
};
