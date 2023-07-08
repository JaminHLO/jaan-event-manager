export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

// jaanSearch - sorts array of clubs or events by distance from user
// jaanArray - input array of objects with User first, followed by 
// either Club or Event objects
export async function jaanSearch(jaanArray) {
  const APIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
  if (!jaanArray) return null;
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

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originGeocode}&destinations=${destinationGeocodes}&units=imperial&key=${APIKey}`);
    const jsonData = await response.json();
    console.log('jaanSearch result is', jsonData);
    return jsonData
  } catch (err) {
    // throw new Error (err)
  }

}

// alternate cleaner approach
export async function getGeocode(address) {

  const APIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  if (!address) return null;

  const geoArray = address.toString().trim().split(' ');
  const geoString = geoArray.join("+");
  console.log("geoString is:", geoString);
  try {
    // console.log(`About to fetch: https://maps.googleapis.com/maps/api/geocode/json?address=${geoString}&key=${APIKey}`)
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geoString}&key=${APIKey}`);
    // console.log("response is", response);
    const jsonData =  await response.json();
    const geoCode = JSON.stringify(jsonData.results[0].geometry.location);
    return geoCode;
  } catch(err) {
    // throw new Error (err)
  }
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('jaan-manager', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('clubs', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
