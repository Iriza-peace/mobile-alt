import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = () => instance.get('/posts');
export const getPost = (id) => instance.get(`/posts/${id}`);
export const getComments = (postId) => instance.get(`/posts/${postId}/comments`);
export const createPost = (post) => instance.post('/posts', post);
export const deletePost = (id) => instance.delete(`/posts/${id}`);

export default instance;
