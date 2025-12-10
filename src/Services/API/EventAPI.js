import { ApiService } from "../ApiService";

export const EventApi = {
    fetchEvents: ({ isAdminEvent = false, isEventPage = false } = {}) =>
        ApiService.post("/events/list", { isAdminEvent, isEventPage }),

    createEvent: (data) => ApiService.post("/events", data),

    updateEvent: (id, data) =>
        ApiService.put(`/events/${id}`, data),

    deleteEvent: (id) =>
        ApiService.delete(`/events/${id}`),
};
