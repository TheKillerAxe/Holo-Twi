require('dotenv').config();

const axios = require('axios');

// Initialize new axios instance.
const bng = axios.create({
    baseURL: 'https://www.bungie.net/Platform',
    timeout: 60000,
    headers: {
        'X-API-Key': process.env.BNG_API_KEY,
        'Authorization': 'Bearer access_token'
    }
});

/**
 * Gets the requested user's total Trinity Ghoul kills, according to the trackers in the vault or character inventory.
 *
 * @param {number} membershipType The type of membership of the user: Xbox (1), PSN (2), Steam (3), Blizzard (4), Stadia (5), EpicGames (6).
 * @param {string} membershipID The user's Bungie membership ID.
 * 
 * @returns {number} Total number of T-Ghoul PvP kills.
 */
const getTGhoulKills = async (membershipType, membershipID) => {
    try {
        const profileDataRequest = await bng.get(`/Destiny2/${membershipType}/Profile/${membershipID}/?components=102,201`);
        const profileData = profileDataRequest.data.Response;

        const vaultItems = profileData.profileInventory.data.items;
        const characters = profileData.characterInventories.data;
        const instanceID = [];

        const vaultTGhouls = vaultItems.filter((item) => item.itemHash == 814876685);
        vaultTGhouls.forEach((TGhoul) => instanceID.push(TGhoul.itemInstanceId));

        for (const char in characters) {
            const character = characters[char];
            const TGhoul = character.items.find((item) => item.itemHash == 814876685);

            if (TGhoul) instanceID.push(TGhoul.itemInstanceId);
        }

        let kills = 0;

        for (const id of instanceID) {
            const itemDataRequest = await bng.get(`/Destiny2/1/Profile/4611686018439322455/Item/${id}/?components=309`);
            const itemData = itemDataRequest.data.Response;

            const OPP = itemData.plugObjectives.data.objectivesPerPlug;

            for (const plug in OPP) {
                const objectives = OPP[plug];
                const tracker = objectives.find((obj) => obj.objectiveHash == 2439952408);

                if (tracker) { kills += tracker.progress; break; }
            }
        }

        return kills;
    } catch (error) { console.log(error); }
}

// getTGhoulKills(1, '4611686018439322455').then((kills) => console.log('Trinity Ghoul: ' + kills));

module.exports = {
    getTGhoulKills
};