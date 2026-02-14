import { options } from "./index.js"

export async function getProfiles() {
    const API_URL = "https://v2.api.noroff.dev/social/profiles"

    try {
        const response = await fetch(API_URL, options)

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json()
        return data;

    } catch (error) {
        throw error;
    }
}

export async function getProfile(name) {
    const API_URL = `https://v2.api.noroff.dev/social/profiles/${name}`

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