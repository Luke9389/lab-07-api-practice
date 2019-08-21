// const geoData = require('./data/geo.json');
const request = require('superagent');

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = process.env.GEOCODE_API_KEY;

//const locationSearch = require('../data/location-search.json');


module.exports = {

    getLocation(location = 'toothbrush'){
        return request
            .get(`${BASE_URL}`)
            .query({ address: `${location}` })
            .query({ key: API_KEY })
            .then(res => res.body.results)
            .catch(err => 'something went wrong');
    },

    getLatLong(locationData, searchString) {
        const responseObject = {
            'search_query': searchString,
            'formatted_query': locationData[0].formatted_address,
            'latitude': locationData[0].geometry.location.lat,
            'longitude': locationData[0].geometry.location.lng
        };
        return responseObject;
    }

};
