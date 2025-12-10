import { ApiService } from "../ApiService";

export const UserApi = {
    fetchUsers: () => ApiService.get("/users"),
    fetchUserById: (id) => ApiService.get(`/users/${id}`),
    createUser: (data) => ApiService.post("/users/add", data),
    updateUser: (id, data) =>
        ApiService.put(`/users/update/${id}`, data),
    deleteUser: (id) => ApiService.delete(`/users/${id}`),
    getUserListByFilterSort: (params) =>
        ApiService.post("/users/list", params),
    loginUser: (data) => ApiService.post("/users/login", data),
};
