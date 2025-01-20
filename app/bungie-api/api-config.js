require('dotenv').config();

const crypto = require('crypto');
const { BungieApi } = require('bungie.net');

const apiKey = process.env.BNG_API_KEY;
const clientID = process.env.BNG_CLIENT_ID;
const clientSecret = process.env.BNG_CLIENT_SECRET;

// Initialize API Platform.
const api = new BungieApi({
    apiKey: apiKey,
    clientId: clientID,
    clientSecret: clientSecret
});

/**
 * Generates a new authorization link.
 * 
 * @returns {string} The authorization link, to obtain the authorization code.
 */
const authLink = () => {
    const authURL = 'https://www.bungie.net/en/oauth/authorize';
    const authState = crypto.randomBytes(20).toString('hex');

    return `${authURL}?client_id=${clientID}&response_type=code&state=${authState}`;
}

/**
 * Utilizes the authorization code to request an access token through the API platform.
 *
 * @param {string} code The authorization code obtained from the authorization link's 'code' parameter.
 * 
 * @returns {JSON} The authorized user's information, more specifically: membership_type, membership_id, access_token.
 */
const APIConfig = async (code) => {
    await api.authorize(code);

    const memberships = await api.user.getMembershipDataForCurrentUser()

    const membership_type = memberships.destinyMemberships[0].membershipType;
    const membership_id = memberships.destinyMemberships[0].membershipId;

    return {
        membership_type,
        membership_id,
        access_token: api.accessToken.raw
    };
}

module.exports = {
    authLink,
    APIConfig
};