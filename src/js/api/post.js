
import { BASE_URL, getHeaders } from "./index.js"

export async function createPost(payload) {
    const API_URL = `${BASE_URL}/posts`

    const postOptions = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    }

    try {
        const response = await fetch(API_URL, postOptions)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}
