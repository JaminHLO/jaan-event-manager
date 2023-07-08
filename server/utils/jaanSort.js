const axios = require('axios');

// jaanSort - sorts array of clubs or events by distance from user
// jaanArray - input array of objects with User first, followed by 
// either Club or Event objects
module.exports = {
     jaanSort: function (user, jaanArray) {
        const APIKey = 'AIzaSyDRsmW5OJbpiAhShk3u3a06FwJK9F9RjE4'
        // process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
        console.log('APIKey is:', APIKey);
        if (!jaanArray || !user) return null;
        console.log('user is:', user);
        console.log('jaanArray is:', jaanArray);
        // const jaanArray = ''
    
        // hardcoded input for testing
        const originGeocode = `33.8423839%2C-84.511287`; // %2C is comma
        const destinationGeocodes = '33.7700012%2C-84.3811458'; // %7C is |
        
        // const originGeocode = JSON.parse(jaanArray[0]);
        // let destinationGeocodes;
        // jaanArray.slice(1).map((geoString, index) => {
        //   if (index !== 0) destinationGeocodes += '%7C';
        //   const geo = JSON.parse(geoString);
        //   destinationGeocodes += (geo.lat).toString();
        //   destinationGeocodes += (geo.lng).toString();
        //   return destinationGeocodes;
        // });
    
        console.log(`URL to fetch is: https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originGeocode}&destinations=${destinationGeocodes}&units=imperial&key=${APIKey}`)
    
        axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originGeocode}&destinations=${destinationGeocodes}&units=imperial&key=${APIKey}`)
        .then((response)=>{
            console.log('distance in yards is:', response.data.rows[0].elements[0].distance.value)
        })
        .catch((err)=> {
            console.err(err);
        })
        // try {
        // const response =  fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originGeocode}&destinations=${destinationGeocodes}&units=imperial&key=${APIKey}`);
        // // const jsonData = await response.json();
        // console.log('jaanSearch result is', response);
        // } catch (err) {
        // throw new Error (err)
        // }
        // jaanArray.push(jaanArray[0]);
        return jaanArray;
  
  }
}