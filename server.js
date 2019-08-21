// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');


// Application Setup
const mapApi = require('./services/geocode-api.js');
const weatherApi = require('./services/darksky-api.js');
const eventsApi = require('./services/eventbrite-api.js');
// - make an express app!
const app = express();
// - get the port on which to run the server
const PORT = process.env.PORT;
// - enable CORS
app.use(cors());
// - define the server
app.use(express.static('server.js'));

// Routes

app.get('/location', (request, response) => {
    mapApi.getLatLong(request.query.search)
        .then(latLongObject => response.json(latLongObject))
        .catch(err => response.status(500).json({ error: err.message || err })
        );
});

app.get('/weather', (request, response) => {
    weatherApi.getEightDayForecast(request.query)
        .then(result => response.json(result))
        .catch(err => response.status(500).json({ error: err.message || err })
        );
});

app.get('/events', (request, response) => {
    eventsApi.getEvents(request.query)
        .then(result => response.json(result))
        .catch(err => response.status(500).json({ error: err.message || err })
        );
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});