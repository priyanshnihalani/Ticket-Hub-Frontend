import axios from "axios";

const TICKET_API = "http://localhost:3001/tickets";

export const fetchTickets = () => axios.get(`${TICKET_API}/list`);
export const fetchTicketById = (id) => axios.get(`${TICKET_API}/list/${id}`);
export const createTicket = (data) => axios.post(`${TICKET_API}/add`, data);
export const updateTicket = (id, data) => axios.put(`${TICKET_API}/update/${id}`, data);
export const deleteTicket = (id) => axios.delete(`${TICKET_API}/delete/${id}`);
export const filterTickets = (filterData) => axios.post(`${TICKET_API}/filter`, filterData);
export const exportTicketsExcel = (payload) =>
    axios.post(`${TICKET_API}/export/excel`, payload, { responseType: "blob" });