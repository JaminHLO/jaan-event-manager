const axios = require('axios');

// jaanSort - sorts array of clubs or events by distance from user
// jaanArray - input array of objects with User first, followed by 
// either Club or Event objects
module.exports = {
     jaanSort: async (user, jaanArray) => {
        const APIKey = process.env.GOOGLE_MAPS_API_KEY;
        // console.log('APIKey is:', APIKey);

        // load and format user for google
        // console.log(`jaanArray.name is: ${jaanArray[0]?.title}, user is: ${user?.name}`)
        if (!jaanArray || !user) return null;
        const tmpOriginGeocode = JSON.parse(user.geocode);
        const originGeocode = `${tmpOriginGeocode.lat}%2C${tmpOriginGeocode.lng}`
        // console.log('origin geocode is:', originGeocode);

        // load and format jaanArray for google
        let destinationGeocodes = ''
        jaanArray.map((item, index)=> {
            const tmpDestGeocode = JSON.parse(item.geocode);
            if (index !== 0) destinationGeocodes += `%7C`;
            destinationGeocodes += (tmpDestGeocode.lat).toString();
            destinationGeocodes += `%2C`;
            destinationGeocodes += (tmpDestGeocode.lng).toString();
            // console.log(`destination #${index} geocode is: ${tmpDestGeocode.lat}%2C${tmpDestGeocode.lng}`)
        });
    
        // hardcoded input for testing
        // originGeocode = `33.8423839%2C-84.511287`; // %2C is comma
        // destinationGeocodes = '33.7700012%2C-84.3811458'; // %7C is |

        const sortedArray = [];
        // console.log(destinationGeocodes)
        // console.log(`URL to fetch is: https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originGeocode}&destinations=${destinationGeocodes}&units=imperial&key=${APIKey}`)
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originGeocode}&destinations=${destinationGeocodes}&units=imperial&key=${APIKey}`)

            // populate distance array
            const distanceArray = []; 
            response.data.rows[0].elements.map((element, index)=> {
                // console.log(`distance in yards: ${element.distance.value}, in miles: ${element.distance.text}`);
                distanceArray.push({index: index, distance: element.distance.value});
            });
            // console.log('distanceArray is now', distanceArray);
            // distanceArray.map((element, index)=> console.log(`title:${jaanArray[index].title}, distance:${element.distance}`))
            // sort by distance
            distanceArray.sort((a,b) => a.distance - b.distance);
            // console.log('distanceArray is sorted', distanceArray);
            // jaanArray to sortedArray by distanceArray's sorted indexes
            for (let i=0; i < jaanArray.length; i++) {
                sortedArray.push(jaanArray[distanceArray[i].index]);
            }
            distanceArray.map((element, index)=> console.log(`title:${sortedArray[index].title}, distance:${element.distance}`))
        // console.log("jaanArray is", jaanArray);
        // console.log("sortedArray is", sortedArray);
        // return jaanArray;
        return sortedArray;
        }
        catch(err) {
            console.log(err);
        }


  }
}