const request = require('superagent');

const BASE_URL = 'https://api.darksky.net/forecast';
const API_KEY = process.env.DARKSKY_API_KEY;

module.exports = {

    getEightDayForecast(latLong = { latitude: '40', longitude: '-30' }) {
        return request
            .get(`${BASE_URL}/${API_KEY}/${latLong.latitude},${latLong.longitude}`)
            .then(res => getWeather(res.body))
        ;
    }

};

function getWeather(dataObj) {
    return dataObj.daily.data.map(dailyForecast => {
        const forecastDay = new Date(dailyForecast.time * 1000);
        const dateArray = forecastDay.toUTCString().split(' ');
        let day = dateArray[0].split(',')[0];
        let date = dateArray[1];
        let month = dateArray[2];
        let year = dateArray[3];
        return {
            'forecast': `${dailyForecast.summary} The high is ${Math.round(dailyForecast.temperatureHigh)}°, with a low of ${Math.round(dailyForecast.temperatureLow)}°`,
            'time': [day, month, date, year].join(' '),
        };
    });
}