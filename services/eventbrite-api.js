const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const API_KEY = process.env.EVENTBRITE_API_KEY;

module.exports = {

    getEvents(latLong = { latitude: '45.540788', longitude: '-122.6601147' }) {
        return request
            .get(`${BASE_URL}`)
            .query({ token: API_KEY })
            .query({ 'start_date.keyword': 'today' })
            .query({ 'location.latitude': latLong.latitude })
            .query({ 'location.longitude': latLong.longitude })
            .then(res => res.body.events.slice(0, 20).map(event => {
                return {
                    link: event.url,
                    name: event.name.text,
                    event_date: event.start.local,
                    summary: event.summary
                };
            }))
        ;
    }

};
