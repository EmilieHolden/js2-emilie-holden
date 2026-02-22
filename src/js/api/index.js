
const apiKey = '0687c3e4-578f-46b6-8524-17fe91d9bee6';
export const BASE_URL = "https://v2.api.noroff.dev/social"

export function getHeaders() {
    const accessToken = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey,
        "Content-Type": "application/json"
    }
}
