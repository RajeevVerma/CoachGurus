// Import project items
import {
    ErrorMessages,
    FakeTypes,
    HeaderStrings,
    Methods,
    UriStrings,
} from './data.constants';

const fakeType = process.env.REACT_APP_NODE_FAKE_TYPE;
const delay = process.env.REACT_APP_DELAY;

interface IErrorMessageResponse {
    exceptionMessage?: string;
    message?: string;
}

/**
 * Simple web request.
 */
export const request = (
    uri: string,
    options?: RequestInit,
    noFail = false,
): Promise<Response> => baseFetch(configuredUri(uri), options, noFail);

/**
 * This function will serve up fake or real data based on the REACT_APP_NODE_FAKE environment variable. Will extract JSON results.
 * Fake data should be stored in the calling container constants.js file.
 *
 * @param {promise} providedRequest Promise returned from an isomorphic fetch.
 * @param {object} fakeDate Data to return if shouldFake.
 * @param {object} transform Transform to apply to the response data.
 */
export function requestData<T>(
    providedRequest: Promise<Response> | string,
    fakeData?: T,
    transform?: (results: T) => unknown,
): Promise<T> | Promise<unknown> {
    if (fakeType && fakeType === FakeTypes.LOCAL && fakeData) {
        return fakeResponse(fakeData, transform);
    } else {
        // If request is a string instead of promise, wrap it in a request promise.
        const requestObject: Promise<Response> = typeof providedRequest === 'string'
            ? request(providedRequest)
            : providedRequest;

        if (requestObject !== undefined) {
            return response(requestObject, transform);
        }
    }

    // There was no fake data and requestObject creation failed.
    return new Promise((res, rej) => rej(ErrorMessages.NO_FAKE_AND_NO_REQUEST));
}

/**
 * This function will serve up fake or real data based on the REACT_APP_NODE_FAKE environment variable. Will post the data and extract JSON results.
 * Fake data should be stored in the calling container constants.js file.
 *
 * @param {promise} providedRequest Promise returned from an isomorphic fetch.
 * @param {object} fakeDate Data to return if shouldFake.
 * @param {object} transform Transform to apply to the response data.
 */
export function postData<T>(
    providedRequest: Promise<Response> | string,
    fakeData?: T,
    // eslint-disable-next-line
    requestData?: any,
    transform?: (results: T) => unknown,
): Promise<T> | Promise<unknown> {
    if (fakeType && fakeType === FakeTypes.LOCAL && fakeData) {
        return fakeResponse(fakeData, transform);
    } else {
        const body = (requestData)
            ? JSON.stringify(requestData)
            : null;
        const requestOptions = {
            body: body,
            method: 'POST',
        };

        // If request is a string instead of promise, wrap it in a request promise.
        const requestObject: Promise<Response> = typeof providedRequest === 'string'
            ? request(providedRequest, requestOptions)
            : providedRequest;

        if (requestObject !== undefined) {
            return response(requestObject, transform);
        }
    }

    // There was no fake data and requestObject creation failed.
    return new Promise((res, rej) => rej(ErrorMessages.NO_FAKE_AND_NO_REQUEST));
}

/**
 * Helper method to extract a web response error from the json response.
 *
 * @param error Response that contains an error to extract.
 */
export function getErrorFromResponse(error: { res: Response; toString: () => string }): string {
    if (error && error.res && error.res instanceof Response && error.res.json) {
        error
            .res
            .json()
            .then((responseJson: IErrorMessageResponse) => {
                if (responseJson) {
                    if (responseJson.exceptionMessage) {
                        return responseJson.exceptionMessage;
                    } else if (responseJson.message) {
                        return responseJson.message;
                    }
                }

                return;
            })
            .catch(() => ErrorMessages.UNABLE_TO_PARSE_JSON);
    } else if (error) {
        return error.toString();
    }

    return ErrorMessages.UNKNOWN_REQUEST_ERROR;
}

/**
 * Helper method to determine proper base URL
 */
export const getBaseUrl = (): string => {
    // const { protocol, hostname, port } = window.location;

    return 'http://localhost:8081'; //`${protocol}//${hostname}${port ? UriStrings.PORT_DELIMITER + port : ''}`;
};

/**
 * Configure the URI with env settings (currently only jsonindent)
 * @param uri
 */
const configuredUri = (uri: string): string => {
    let fetchUrl = uri;

    const delimiter = !fetchUrl.includes(UriStrings.FIRST_QUERY_STRING_DELIMITER)
        ? UriStrings.FIRST_QUERY_STRING_DELIMITER
        : UriStrings.ADDITIONAL_QUERY_STRING_DELIMITER;

    fetchUrl = `${fetchUrl}${delimiter}${UriStrings.JSON_INDENT}`;

    return fetchUrl;
};

/**
 * Helper method for performing a HTTP fetch on a URI.
 *
 * @param uri The URI to perform a fetch upon.
 * @param options Options to pass through to the HTTP fetch.
 * @param noFail Whether or not to allow bad requests to cause a failure.
 */
const baseFetch = async (uri: string, options: RequestInit = {}, noFail = false): Promise<Response> => {
    const headers = options && options.headers ? options.headers as Headers : new Headers();
    const { method } = options;

    if (headers) {
        if (!headers.get(HeaderStrings.CONTENT_TYPE) && method && method !== Methods.DELETE) {
            headers.append(HeaderStrings.CONTENT_TYPE, HeaderStrings.JSON_TYPE);
        }

        if (!headers.get(HeaderStrings.HEADER_ACCEPT)) {
            headers.append(HeaderStrings.HEADER_ACCEPT, HeaderStrings.JSON_TYPE);
        }
    }

    const res = await fetch(
        uri,
        {
            ...options,
            credentials: HeaderStrings.CREDENTIAL_INCLUDE,
            headers,
            mode: HeaderStrings.MODE_CORS,
        });

    return checkStatus(res, noFail);
};

interface IErrorResponse extends Response {
    error: boolean;
}

/**
 * Check the status of the web response.
 *
 * @param response Web response.
 * @param noFail Whether or not to allow bad status to cause a failure.
 */
const checkStatus = (response: Response, noFail = false): Response | IErrorResponse => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (noFail) {
        return { ...response, error: true };
    }

    const error = new Error(response.statusText);

    error.stack = response.statusText;

    throw error;
};

/**
 * Helper method to get response as json result.
 * @param {promise} response Promise returned from fetch.
 * @param {object} transform Transform to apply to the response data.
 */
function response<T>(
    response: Promise<Response>,
    transform?: (results: T) => unknown,
): Promise<T> | Promise<unknown> {
    return new Promise((resolve, reject) => {
        response
            .then((response: Response): void => {
                if (response) {
                    response
                        .json()
                        .then((jsonResults: T) => {
                            resolve(transform
                                ? transform(jsonResults)
                                : jsonResults,
                            );
                        })
                        .catch(() => { reject(ErrorMessages.UNABLE_TO_PARSE_JSON); });
                } else {
                    reject(ErrorMessages.INVALID_RESPONSE);
                }
            }).catch((ex: unknown) => {
                reject(ex);
            });
    });
}

/**
 * Helper method to get fake response as json result.
 * @param {object} fakeDate Data to return if shouldFake.
 * @param {object} transform Transform to apply to the response data.
 */
function fakeResponse<T>(
    fakeData: T,
    transform?: (results: T) => unknown,
): Promise<T> | Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(transform
                ? transform(fakeData)
                : fakeData,
            );
        }, delay
            ? +delay
            : 0,
        );
    });
}