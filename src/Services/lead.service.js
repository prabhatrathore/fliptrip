import axios from "axios";
import { url } from "./url.service"
let serverUrl = `${url}/lead`




export const createLead = (obj) => {
    return axios.post(`${serverUrl}/`, obj)
} 