const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY2pjOCIsImEiOiJja2Fyc3h0cmYwYnBtMnFwamRnYW9vemg1In0.yvqVnigjlyatmS5a5SaTEQ&limit=1"
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        }
        else if (body.features.length === 0) {
            callback('No match for search query', undefined)
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode