import axios from "axios";
import { url } from "./url.service";
const serverUrl = `${url}/users`;

export const addEmployeeToDb = async (obj) => {
    return await axios.post(`${serverUrl}/`, obj);
};
export const getEmployess = async (userId, role) => {
    return await axios.get(`${serverUrl}/getByUserId/${userId}?role=${role}`);
};
export const deleteEmployees = async (id) => {
    return await axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const login = async (formData) => {
    console.log(formData);
    return await axios.post(`${serverUrl}/login`, formData);
};
