// const geoData = require('./data/geo.json');
const request = require('superagent');

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = process.env.GEOCODE_API_KEY;


module.exports = {

    getLocation(location){
        console.log(location);
        // request
        //     .get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`)
        //     .query({ key: API_KEY })
        //     .then(res => console.log(res.body));
    }

};


// function getLatLong(searchString) {
//     const responseObject = {
//         'search_query': searchString,
//         'formatted_query': geoData.results[0].formatted_address,
//         'latitude': geoData.results[0].geometry.location.lat,
//         'longitude': geoData.results[0].geometry.location.lng
//     };
//     return responseObject;
// }


// try {
//     const responseObject = getLatLong(request.query.search);
//     response.status(200).json(responseObject);
// }
// catch (err) {
//     response.status(500).json('server.error: something blew up');
// }