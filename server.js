// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');


const mapApi = require('./services/geocode-api.js');
// Application Setup
// - make an express app!
const app = express();
// - get the port on which to run the server
const PORT = process.env.PORT;
// - enable CORS
app.use(cors());

app.use(express.static('server.js'));

app.get('/location', (request, response) => {
    console.log(request.query);
    mapApi.getLocation(request.query.search)
        .then(location => response.json(location));
});

app.get('/weather', (request, response) => {
    
});

const skyNet = require('./data/darksky.json');
function getWeather(/*location*/) {
    const forecastArray = [];
    skyNet.daily.data.forEach(dailyForecast => {
        const forecastDay = new Date(dailyForecast.time * 1000);
        const dateArray = forecastDay.toUTCString().split(' ');
        let day = dateArray[0].split(',')[0];
        let date = dateArray[1];
        let month = dateArray[2];
        let year = dateArray[3];
        const responseObject = {
            'forecast': dailyForecast.summary,
            'time': [day, month, date, year].join(' '),
        };
        forecastArray.push(responseObject);
    });
    return forecastArray;
}

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});