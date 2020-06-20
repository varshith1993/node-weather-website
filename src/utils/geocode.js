
 const request = require('request')


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoidmFyc2hpdGhtIiwiYSI6ImNrYjRtbDRjMDAwcjgycXBmbnlodHdkOXYifQ._U_HMzzIFvIx7LRiY9Pk9A'

 request({ url, json: true }, (error, { body }) => {
     
       if(error){
           callback('unable to call the location service', undefined )
       }else if(body.features.length === 0){
            callback('unable to get the location details try search another', undefined)
       }else{
          callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location: body.features[0].place_name
          })
       }
 })
}

module.exports = geocode