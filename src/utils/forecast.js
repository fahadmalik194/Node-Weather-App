const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=14e241260cc2471399e2ad2e87c4e999&query='+ latitude + ',' + longitude

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect the weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else {
            const str = body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature +'°C out. It feels like '+ body.current.feelslike +'°C out.'
            callback(undefined, str)
        }
    })
}

module.exports = forecast