import { options } from "./index.js"

export async function getPosts(page = 1, limit = 10) {
    const API_URL = `https://v2.api.noroff.dev/social/posts?page=${page}&limit=${limit}`

    try {
        const response = await fetch(API_URL, options)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}

export async function getPost(id) {
    const API_URL = `https://v2.api.noroff.dev/social/posts/${id}`

    try {
        const response = await fetch(API_URL)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}