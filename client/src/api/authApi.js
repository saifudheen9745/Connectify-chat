import { api } from "../config/axiosConfig";

export const doLogin = async(loginCred)=>{
    try {
        const loginRes = await api.post('/login',loginCred)
        return loginRes.data
    } catch (error) {
        throw {msg:error.response.data.msg}
    }
}

export const doRegister = async(registerCred)=>{
    try {
        const regRes = await api.post('/register',registerCred)
        return regRes.data
    } catch (error) {
        throw {msg:error.response.data.msg}
    }
}

