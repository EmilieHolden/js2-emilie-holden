import { BASE_URL, getHeaders } from "./index.js"

export async function getProfiles() {
    const API_URL = `${BASE_URL}/profiles`

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        console.error(error);
    }
}

export async function getProfile(name) {
    const API_URL = `${BASE_URL}/profiles/${name}?_followers=true`

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        console.error(error);
    }
}

export async function getProfilePosts(name) {
    const API_URL = `${BASE_URL}/profiles/${name}/posts?_author=true&_count=true`

    try {
        const response = await fetch(API_URL, {
            headers: getHeaders(),
        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        console.error(error);

    }
}