require('dotenv').config();

const crypto = require('crypto');
const { BungieApi } = require('bungie.net');

const apiKey = process.env.BNG_API_KEY;
const clientID = process.env.BNG_CLIENT_ID;
const clientSecret = process.env.BNG_CLIENT_SECRET;

// Create an authorization link.
const authURL = 'https://www.bungie.net/en/oauth/authorize';
const authState = crypto.randomBytes(20).toString('hex');

console.log(`${authURL}?client_id=${clientID}&response_type=code&state=${authState}`);

// Initialize API Platform.
const api = new BungieApi({
    apiKey: apiKey,
    clientId: clientID,
    clientSecret: clientSecret
});

/**
 * Utilizes the authorization code to request an access token through the API platform.
 *
 * @param {string} code The authorization code obtained from the authorization link's 'code' parameter.
 * 
 * @returns {string} The access token.
 */
const APIConfig = async (code) => {
    await api.authorize(code);

    return api.accessToken.raw;
}

module.exports = {
    APIConfig
};