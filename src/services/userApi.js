import axios from "axios";
import { store } from "../redux/store";

const login = (username, password) => {
    return axios.post("http://localhost:8000/auth/login", {username, password})
}
const update = (id, username) => {
    const data = JSON.parse(localStorage.getItem('persist:root'));
    const user = JSON.parse(data.user)

    return axios.patch(`http://localhost:8000/auth/${id}`, {username}, { headers: {"Authorization" : `Bearer ${user.jwt}`} })
}
export {login, update}
