import { BASE_URL, getHeaders } from "./index.js"

export const followProfile = async (name) => {
    const API_URL = `${BASE_URL}/profiles/${name}/follow`

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: getHeaders(),

        })

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        return data;

    } catch (error) {
        console.error(error);
    }

}
