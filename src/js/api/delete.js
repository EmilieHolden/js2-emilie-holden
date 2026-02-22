import { BASE_URL, getHeaders } from "./index.js"

/**
 * Deletes a post by its id using API.
 * 
 * @param {} id - the id of the post to delete.
 * @returns - a success message for post deleted, and the post is removed from API.
 * @example deletePost(123)
 * Post is deleted.
 */
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

