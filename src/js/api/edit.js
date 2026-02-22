import { BASE_URL, getHeaders } from "./index.js"

export const editPost = async (id, payload) => {
    const API_URL = `${BASE_URL}/posts/${id}`

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data;

    } catch (error) {
        console.error(error);
    }

}

