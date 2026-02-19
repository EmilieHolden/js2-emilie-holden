import { BASE_URL, getHeaders } from "./index.js"

export async function getPosts(page = 1, limit = 10) {
    const API_URL = `${BASE_URL}/posts?page=${page}&limit=${limit}&_author=true&_count=true`

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}


export async function searchPosts(query, page = 1, limit = 10) {
    const API_URL = `${BASE_URL}/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&_author=true&_count=true`

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}

export async function getPost(id) {
    const API_URL = `${BASE_URL}/posts/${id}&_author=true`

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}