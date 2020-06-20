// const url = "http://api.weatherstack.com/current?access_key=795367cbc26384dc1075bf53813c2e74&query=New%20york"

const request = require("request")

const forecast = (latitude, longitude , callback) => {

      const url = 'http://api.weatherstack.com/current?access_key=795367cbc26384dc1075bf53813c2e74&query='+latitude + "," + longitude

       request({url,  json: true }, (error, { body }) => {
         
          if(error){
              callback('unable to call the weather service', undefined)
          }else if(body.error){
              callback('unable to find a given location try again correctly', undefined)
          }else{
      
            callback(undefined, body.current.weather_descriptions + ' day it is currently temperature '+ body.current.temperature + ' degree out and there is ' + body.current.precip + ' % change of rain ')
          }
       })
}

module.exports = forecast