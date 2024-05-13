import axios from "axios"

const baseUrl = "https://localhost:7284/api/products"

let token = null

const setToken = NewToken => {token = `bearer ${NewToken}`}

const getAll = () => {
    
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newProduct => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newProduct, config)
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
    return axios.put(`${baseUrl}/${object.ProductId}`, object, config)
}

export default { getAll, create, remove, update, setToken }