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



export default function JaanMap(args) {

    const latLngArray = args.latLngArray;
    console.log('latLngArray is', latLngArray)
    // const center = JSON.parse(args?.center);

    

    // let positions = [];
    // if (args?.positions){
    //     positions = args.positions;
    //     console.log("marker positions:", positions);
    // }

    // hardcoded positions for testing
    // positions = [
    //     {
    //         lat: 33.8722,
    //         lng: -84.4902
    //     }
    // ]

    // hardcoded for testing
    // const center = { 
    //     lat: 33.7722,
    //     lng: -84.3902
    // };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY // add Key from Slack
        
    });
    //process.env.REACT_APP_GOOGLE_MAPS_API_KEY // not secure

    const zoom = 10;
    const [map, setMap] = useState(null);

    const onLoad = (map) => {
        // if (args) { // should be 1
            const bounds = new window.google.maps.LatLngBounds(); // center
            latLngArray.map((location) => bounds.extend(location));
            // bounds.extend(center); // getPosition()
            // bounds.extend(positions[0])
            map.fitBounds(bounds);
        // } 
        // else {
        //     map.setZoom(zoom);
        // }
        if(map.getZoom() > 10){
            map.setZoom(10);
        }
        // map.setZoom(map.getZoom()-2);
        setMap(map);
    }

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={latLngArray[0]}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker 
                    icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
                    position={latLngArray[0]}

                />
                {latLngArray.slice(1).map((item, index) => {
                    return (
                        <Marker 
                            key={index}
                            label={(index+1).toString()}
                            position={item}
                        />
                    )
                })}
                
            </GoogleMap>)
            : <> </>
    )

} 


