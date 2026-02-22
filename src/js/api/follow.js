import { BASE_URL, getHeaders } from "./index.js"

/**
 * Sends request to follow a user profile.
 * @param {string} name - The name of the user to follow.
 * @returns - Updated profile with follower. Returns an error message if failed.
 * @example followProfile("emz")
 * User is followed. 
 */
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
