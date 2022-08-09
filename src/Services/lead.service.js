import axios from "axios";
import { url } from "./url.service"
let serverUrl = `${url}/lead`




export const createLead = (obj) => {
    return axios.post(`${serverUrl}/`, obj)
}



export const getLeadsByRole = (id, role) => {
    console.log(role, "role")
    return axios.get(`${serverUrl}/getByRole/${id}?role=${role}`)
}


export const updateLeadStatus = (id, obj) => {
    return axios.patch(`${serverUrl}/updateStatusById/${id}`, obj)
} 