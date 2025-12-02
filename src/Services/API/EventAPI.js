import axios from "axios";

const API_URL = "http://localhost:3001/events";

export const fetchEvents = ({ isAdminEvent = false } = {}) => axios.post(`${API_URL}/list`, {isAdminEvent});
export const createEvent = (data) => axios.post(API_URL, data);
export const updateEvent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);