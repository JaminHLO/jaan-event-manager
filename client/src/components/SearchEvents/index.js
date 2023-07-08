import React, { useState } from "react";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_SEARCH_EVENTS, QUERY_ME } from "../../utils/queries";
import JaanMap from "../JaanMap";

const SearchEvents = () => {
    const [eventQuery, setEventQuery] = useState("");
    const { meLoading, meData } = useQuery(QUERY_ME)
    const [getEventQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_EVENTS);

    const events = data?.searchEvents || {};
    console.log('events are:', events)


    const handleChange = (event) => {
        setEventQuery(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('eventQuery is', eventQuery)
        await getEventQuery({
            variables: { eventQuery }
        })
    }

    const userData = meData?.me || {}
    const latLngArray = [];
    if (userData?.geocode) latLngArray.push(JSON.parse(userData.geocode));
    if (events?.length) {
        events.map(event => latLngArray.push(JSON.parse(event.geocode)));
    }

    return (
        <div>
            <h2>Search for an event:</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Search for an event:</label>
                    <input
                        type="text"
                        placeholder="Find an event here"
                        onChange={handleChange}
                        name="eventQuery"
                        value={eventQuery}
                    ></input>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                <h3>Results:</h3>
                <JaanMap latLngArray={latLngArray} />
                {events.length ? (
                    events.map((event) => (
                            <div key={event._id}>
                                <p>{event.title}</p>
                                <button>View Details</button>
                            </div>
                        ))
                ) : (
                    <p>No matching event found</p>
                )}
            </div>
        </div>
    )
}

export default SearchEvents;