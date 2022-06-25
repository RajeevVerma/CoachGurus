export interface IPerson {
    id: Number,
    firstName: string,
    lastName: string,
    profilePic: string,
}

export interface IGuru extends IPerson {
    domain: string, // it can be enum/ array of enum [One coach can have multiple skills which he is teaching.]
}