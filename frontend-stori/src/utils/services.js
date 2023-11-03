import axios from "axios";

const url = "http://localhost:8080";

export const addRecipient = async function (body) {
    try {
        const response = await axios.post(`${url}/add-recipient`, body)
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
}

export const getRecipientList = async function () {
    try {
        const response = await axios.get(`${url}/get-recipients`)
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
}

export const postNewsletter = async function (body) {
    try {
        const response = await axios.post(`${url}/submit-newsletter`, body)
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response.data.message)
    }
}

    