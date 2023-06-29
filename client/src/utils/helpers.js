export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

//initial approach works within EventMap
export function getGeocode(address) {

  const APIKey = "";

  const geoArray = address.trim().split(' ');
  const geoString = geoArray.join("+");
  console.log("geoString is:", geoString);
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geoString}&key=${APIKey}`)
  .then((response) => {
      return response.json();
  }).then(jsonData => {
      return jsonData.results[0].geometry.location
    // const geoCode = jsonData.results[0].geometry.location;
    //   console.log('geoCode is', geoCode);
    //   return geoCode;

  })
  .catch(err => {
      throw new Error(err);
  })
}

// alternate cleaner approach
export async function getGeocode2(address) {

  const APIKey = "";

  const geoArray = address.trim().split(' ');
  const geoString = geoArray.join("+");
  console.log("geoString is:", geoString);
  try {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geoString}&key=${APIKey}`);
  const jsonData = response.json();
  const geoCode = jsonData.results[0].geometry.location;
  return geoCode;
  } catch(err) {throw new Error (err)}
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
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
