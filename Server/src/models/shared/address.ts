export interface IAddress {
    addr1: string,
    addr2?: string
    city: string,
    state: string,
    country: string,

    geoLoc?: IGeoLoc
}

export interface IGeoLoc {
    Lat: number,
    Long: number
}