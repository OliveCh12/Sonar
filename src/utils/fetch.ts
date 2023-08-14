import fetch from "node-fetch";

// This function will fetch a single url and return the data
export const fetchSingleUrl = async (url: string) => {
    try {
        const response = await fetch(url);
        const data: any = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// This function will fetch multiple urls and return the data
export const fetchMultipleUrls = async (urls: string[]) => {
    try {
        const promises = urls.map((url) => fetchSingleUrl(url));
        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        throw error;
    }
}

