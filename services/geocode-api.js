const request = require('superagent');

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = process.env.GEOCODE_API_KEY;

module.exports = {

    getLatLong(location = 'toothbrush'){
        return request
            .get(`${BASE_URL}`)
            .query({ address: `${location}` })
            .query({ key: API_KEY })
            .then(res => {
                const locationData = res.body.results;
                return {
                    'search_query': location,
                    'formatted_query': locationData[0].formatted_address,
                    'latitude': locationData[0].geometry.location.lat,
                    'longitude': locationData[0].geometry.location.lng
                };
            })
        ;
    }

};
