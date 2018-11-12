import { get, post } from './utils/httpHelper';

const config = require('./config');
const serverBaseURL = `http://${config.server.host}:${config.server.port}`;

/**
 * @description Makes server request for username
 * @returns {JSON} username in JSON format
 */
export function getUsername() {
    return get(`${serverBaseURL}/user/name`).then(res => res);
}

export function authorize(code) {
    return post(`${serverBaseURL}/user/token`, {code: code}).then(res => res);
}