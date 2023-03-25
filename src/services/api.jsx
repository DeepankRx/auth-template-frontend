import http from './http';

const subEndpoint = {
    auth: '/api/auth',
}

const endpoint = {
    auth: {
        login: `${subEndpoint.auth}/login`,
        signup: `${subEndpoint.auth}/signup`,
        getUserById: `${subEndpoint.auth}/getUserById`,
        updateUserById: `${subEndpoint.auth}/updateUserById`,
        deleteUser: `${subEndpoint.auth}/deleteUser`,
    },
}

export const login = (data) => http.post(endpoint.auth.login, data);
export const signup = (data) => http.post(endpoint.auth.signup, data);
export const getUserById = (id) => http.get(`${endpoint.auth.getUserById}/${id}`);
export const updateUserById = (id, data) => http.put(`${endpoint.auth.updateUserById}/${id}`, data);
export const deleteUser = (id) => http.delete(`${endpoint.auth.deleteUser}/${id}`);

