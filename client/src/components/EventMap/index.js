import {useCallback, useState} from "react"; //
import { GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api"; //

// import fetch from "node-fetch"; // npm i node-fetch


 const containerStyle = {
    width: '300px',
    height: '300px'
 };

//  const center = {
//     lat: 33.7722,
//     lng: -84.3902
//  };

// let geoCode = {};

//  function getGeocode(address) {
//     const geoArray = address.trim().split(' ');
//     const geoString = geoArray.join("+");
//     console.log("geoString is:", geoString);
//     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geoString}&key=AIzaSyDRsmW5OJbpiAhShk3u3a06FwJK9F9RjE4`)
//     .then((response) => {
//         return response.json();
//     }).then(jsonData => {
//         geoCode = jsonData.results[0].geometry.location;
//         console.log('geoCode is', geoCode);
//         return geoCode;

//     })
//     .catch(err => {
//         throw new Error(err);
//     })
//  }

export default function EventMap(center) {
    // hardcoded overwrite for test purposes
    center = { 
        lat: 33.7722,
        lng: -84.3902
    };

    // const address = "1837 Glendmere Drive, Birmingham, AL 35223";
    // geoCode = geocode(address)
    // console.log("geoCode in EventMap is", geoCode)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDRsmW5OJbpiAhShk3u3a06FwJK9F9RjE4" // add Key from Slack
        
    });
    //process.env.REACT_APP_GOOGLE_MAPS_API_KEY // not secure

    const zoom = 10;

    const [map, setMap] = useState(null);

    const onLoad =  (map) => {
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        map.setZoom(zoom);
        setMap(map);
    }

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            ></GoogleMap>)
            : <> </>
    )

} 


// getGeocode("1837 Glendmere Drive, Birmingham, AL 35223");