/**
 * Fetch the feed asynchrously
 * @param {*} feed 
 */
export async function fetchFeed(feed) {
    try{
        const response = await fetch(feed);
        const json = await response.json();
        // Return the feed through another method
        // Return the flag
        return json;
    } catch(e) {
        return false;
        throw e;
    }
}