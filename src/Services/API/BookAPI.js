import { ApiService } from "../ApiService";

export const TicketApi = {
    fetchTickets: () => ApiService.get("/tickets/list"),

    fetchTicketById: (id) =>
        ApiService.get(`/tickets/list/${id}`),

    createTicket: (data) =>
        ApiService.post("/tickets/add", data),

    updateTicket: (id, data) =>
        ApiService.put(`/tickets/update/${id}`, data),

    deleteTicket: (id) =>
        ApiService.delete(`/tickets/delete/${id}`),

    filterTickets: (filterData) =>
        ApiService.post("/tickets/filter", filterData),

    exportTicketsExcel: (payload) =>
        ApiService.postBlob("/tickets/export/excel", Array.isArray(payload) ? payload : [payload]),
};
