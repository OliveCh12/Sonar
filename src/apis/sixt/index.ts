import { format } from "date-fns"
import { fetchMultipleUrls } from "../../utils/fetch.ts"
import { getAllSlidingDayCombinations, groupAllCombinationsByMonth } from "../../utils/dates.ts"

const baseURL = "https://web-api.orange.sixt.com/v1/rentaloffers/offers?pickupStation=S_40106&returnStation=S_40106&pickupDate=2023-02-17T17:00:00&returnDate=2023-02-20T17:00:00&vehicleType=car&currency=EUR&isoCountryCode=FR"


// Destructure the string of the URL to get the query params
export const destructureURL = (url: string) => {
    const urlObject = new URL(url);
    const params = Object.fromEntries(urlObject.searchParams.entries());
    return params;
}

interface QueryParams {
    pickupStation: string;
    returnStation: string;
    pickupDate: string;
    returnDate: string;
    vehicleType: string;
    currency: string;
    isoCountryCode?: string;
}

// Contstruct the URL with the query params
export const constructURL = (baseURL: string, params: Record<string, string>) => {
    const url = new URL(baseURL);
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }
    return url.toString();
}

export const getResult = () => {
    console.log(destructureURL(baseURL));
    // Convert all dates to "2023-02-17T17:00:00" using date-fns
    const dates: Date[] = getAllSlidingDayCombinations(10)[2].map((date) => new Date(format(date, "yyyy-MM-dd'T'HH:mm:ss")));




    console.log(dates);
    return constructURL(baseURL, {  pickupDate: "2023-02-17T17:00:00", returnDate: "2023-02-20T17:00:00" })
}

