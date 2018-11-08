const sessions = {};

/** returns a random string ID */
function generateID() {
    return '' + Math.random();
}

/** return the session state for the ID */
function lookupSession(sessionId) {
    return sessions[sessionId];
}

function setTokens(id, tokens) {
    sessions[id] = tokens;
}

module.exports = {
    setTokens,
    generateID,
    lookupSession
}