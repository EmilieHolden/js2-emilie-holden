import { BASE_URL, getHeaders } from "./index.js"

export const deletePost = async (id) => {
    const API_URL = `${BASE_URL}/posts/${id}`

    const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: getHeaders(),
    })

    if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`)

    return;

}

