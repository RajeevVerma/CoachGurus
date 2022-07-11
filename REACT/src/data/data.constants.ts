/**
 * Error messages.
 */
export enum ErrorMessages {
    /** Response is null or is incorrect type. */
    INVALID_RESPONSE = 'Received an invalid response.',
    /** No fake data or request object provided. */
    NO_FAKE_AND_NO_REQUEST = 'No fake data function or request.',
    /** Catch on the json() promise. */
    UNABLE_TO_PARSE_JSON = 'Unable to parse JSON.',
    /** An unknown error occurred. */
    UNKNOWN_REQUEST_ERROR = 'Unknown error occurred during web request.',
}

/**
 * Strings for header configs and values.
 */
export enum HeaderStrings {
    /** Header field for content mime type. */
    CONTENT_TYPE = 'Content-Type',
    /** Header value for include credential. */
    CREDENTIAL_INCLUDE = 'include',
    /** Header field for accept mime type. */
    HEADER_ACCEPT = 'Accept',
    /** Header value for accepting JSON return type. */
    JSON_TYPE = 'application/json',
    /** Header value for setting mode to cross origin. */
    MODE_CORS = 'cors',
}

/**
 * Currently used HTTP methods (verbs).
 */
export enum Methods {
    /** Verb for removing a resource. */
    DELETE = 'DELETE',
    /** Verb for inserting a resource. */
    POST = 'POST',
    /** Verb for retrieving a resource. */
    GET = 'GET',
}

/**
 * Faker Type that can be set in env files.
 */
export enum FakeTypes {
    /** Fake on localhost. */
    LOCAL = 'local',
    /** None data faking. */
    NONE = 'none',
    /** Fake on server. */
    SERVICE = 'server',
}

export enum UriStrings {
    /** Delimiter for additional query strings. */
    ADDITIONAL_QUERY_STRING_DELIMITER = '&',
    /** Delimiter for first query string */
    FIRST_QUERY_STRING_DELIMITER = '?',
    /** Query string value for json indented response. */
    JSON_INDENT = 'format=jsonindent',
    /** Delimiter for specifying port. */
    PORT_DELIMITER = ':',
}


export const ApiUrls = {
    Get_Url_Root: 'api/',
    Get_Coach_Url: 'get/'

}