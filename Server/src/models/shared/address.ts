import iBaseDbItem from "./baseDbItem"

//** Id is will be formatted as '{country}|{state}|{city}'   sorty-key - 'endeavourId'* /
export interface IAddress extends iBaseDbItem {
    addr1: string,
    addr2?: string
    city: string,
    state: string,
    country: string,

    geoLoc?: IGeoJSON,

    //** Cannot be Null and can be initialized as empty string if no value present*/
    endeavourId: string
}

//** this needs to be replaced with 'dynamodb-geo' */
export interface IGeoJSON {
    Lat: number,
    Long: number
}