import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/tour`;

export const TOURAdd = (obj, role) => {
  return axios.post(`${serverUrl}/`, obj);
};

export const getTour = (query) => {
  return axios.get(`${serverUrl}/?${query}`);
};

export const deleteTour = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const update = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
