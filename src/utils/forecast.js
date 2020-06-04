const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?units=f&access_key=6001682a08647f170cb5c366217f4ab7&query=' + lat + ',' + long
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Bad coordinates')
        }
        else {
            const current = body.current
            var description = current.weather_descriptions[0] + '. '
            const temp = current.temperature
            const feelsLike = current.feelslike
            const precip = current.precip

            callback(undefined, description + 'Current temperature is ' + temp + ' degrees. It feels like ' + feelsLike + ' degrees, with a ' + precip + '% chance of rain.')
        }
    })
}

module.exports = forecast