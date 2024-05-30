import axios from "axios"

// const baseUrl = "https://localhost:7284/api/logins"

const baseUrl = "https://northwindrestapi20240529210032.azurewebsites.net/api/logins"

let token = null


const setToken = newToken => {token = `bearer ${newToken}`}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl,config)
    return request.then(response => response.data)
}

const create = newLogin => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newLogin, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config) 
 }

 

const update = (object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.loginId}`, object, config)
    
}



export default { getAll, create, update, remove, setToken }

