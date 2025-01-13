require('dotenv').config();

const axios = require('axios');

const clientID = process.env.BNG_CLIENT_ID;
const clientSecret = process.env.BNG_CLIENT_SECRET;

axios.post(`https://www.bungie.net/platform/app/oauth/token/`, {
    headers: {
        'Authorization': 'Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// axios.get(`https://www.bungie.net/en/oauth/authorize?client_id=${clientID}&response_type=code&state=${clientSecret}`)
//     .then((res) => {
//         console.log(res.data);
//     });

// const initBNGInstance = async () => {

// }

// const bungie = axios.create({
//     baseURL: 'https://www.bungie.net/Platform',
//     headers: {
//         'X-API-Key': process.env.BNG_API_KEY
//     }
// });

// bungie.get(`/Destiny2/1/Profile/4611686018439322455/?components=102`)
//     .then((res) => {
//         const { profileInventory } = res.data?.Response;
//         console.log(profileInventory);
//     });