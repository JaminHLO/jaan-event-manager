import {useCallback, useState} from "react"; //
import { GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api"; //

const options = {
    disableDefaultUI: true
};

const containerStyle = {
    width: '300px',
    height: '300px'
};

export default function JaanMap(args) {


    let latLngArray = [];
    if (args?.latLngArray) {
        latLngArray = args.latLngArray;
        console.log('latLngArray is', latLngArray)
        // const center = JSON.parse(args?.center);
    }

    // if (args?.eventArray) {
    //     args.eventArray.map((item) => latLngArray.push(JSON.parse(item.geocode)))
    // }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY // add Key from Slack
        
    });
    //process.env.REACT_APP_GOOGLE_MAPS_API_KEY // not secure

    // const zoom = 10;
    const [map, setMap] = useState(null);

    const onLoad = (map) => {
        // if (args) { // should be 1
            const bounds = new window.google.maps.LatLngBounds(); // center
            latLngArray.map((location) => bounds.extend(location));
            // bounds.extend(center); // getPosition()
            // bounds.extend(positions[0])
            console.log("map is", map);
            map.fitBounds(bounds);
        // } 
        // else {
        //     map.setZoom(zoom);
        // }
        // if(map.getZoom() > 10){
        //     map.setZoom(10);
        // }
        map.setZoom(map.getZoom()-2);
        setMap(map);
    }

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    // const onClick = (event) => {
    //     console.log('clicked:', event);
    // }

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={latLngArray[0]}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker 
                    icon={'/images/blue-dot.png'}
                    position={latLngArray[0]}
                    // icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
                />
                {latLngArray.slice(1).map((item, index) => {
                    return (
                        <Marker 
                            key={index}
                            label={(index+1).toString()}
                            position={item}
                            // onClick={onClick}
                        />
                    )
                })}
                
            </GoogleMap>)
            : <> </>
    )

} 


