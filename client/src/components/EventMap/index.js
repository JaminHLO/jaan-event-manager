import {useCallback, useState} from "react"; //
import { GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api"; //

 const containerStyle = {
    width: '300px',
    height: '300px'
 };

 const center = {
    lat: 33.7722,
    lng: -84.3902
 };

export default function EventMap() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY // add Key from Slack
        
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


