import axios from "axios";

const API_URL = "http://localhost:3001/users";

export const fetchUsers = () => axios.get(API_URL);
export const fetchUserById = (id) => axios.get(`${API_URL}/${id}`);
export const createUser = (data) => axios.post(`${API_URL}/add`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
export const getUserListByFilterSort = (params) => axios.post(`${API_URL}/list`, params);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);