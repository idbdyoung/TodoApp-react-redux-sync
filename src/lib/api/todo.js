import axios from './index';

export const getTodosAPI = () => axios.get('/todos');
export const addTodosAPI = (body) => axios.post('/todos', body);
export const writeTodosAPI = (id) => axios.patch(`/todos/${id}`);
export const deleteTodosAPI = (id) => axios.delete(`/todos/${id}`);
