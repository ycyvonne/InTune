const sessions = {};

/** 
 * returns a random string ID 
 * */
function generateID() {
    return '' + Math.random();
}

/** 
 * return the session state for the ID 
 * */
function lookupSession(sessionId) {
    return sessions[sessionId];
}

function setSessionStateById(id, state) {
    sessions[id] = state;
}

module.exports = {
    generateID,
    lookupSession,
    setSessionStateById
}