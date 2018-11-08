import axios from 'axios';

/**
 * make a get request
 * @param {string} URL
 * @returns {Promise}
 */
export function get(url) {
    var config = {
        withCredentials: true
    }
    return axios.get(url, config)
        .then(response => response.data)
        .catch((error) => Promise.reject(`GET ${url} failed: ${error}`));
}

/**
 * make a get request
 * @param {string} URL
 * @param {Object} request body
 * @returns {Promise}
 */
export function post(url, requestBody) {
    var config = {
        withCredentials: true
    }
    return axios.post(url, requestBody, config)
        .then(response => response.data)
        .catch((error) => Promise.reject(`POST ${url} failed: ${error}`));
}