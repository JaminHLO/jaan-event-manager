import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_SEARCH_EVENTS } from "../../utils/queries";

const SearchEvents = () => {
    const [eventQuery, setEventQuery] = useState("");
    const { loading, data } = useQuery(QUERY_SEARCH_EVENTS);
    const events = data?.searchEvents || {};
    console.log("line 10", events)
    const getFilteredEvents = (eventQuery, events) => {
        if (!eventQuery) {
            return [];
        }
        return events.filter((event) => event.title.includes(eventQuery));
    }

    const filteredEvents = getFilteredEvents(eventQuery, events);
    console.log("line 19", filteredEvents)

    const handleChange = (event) => {
        setEventQuery(event.target.value)
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Search for an event:</h2>
            <div>
                <label>Search:</label>
                <input type="text" onChange={handleChange} placeholder="Find an event here"></input>
            </div>
            <div>
                <h3>Results:</h3>
                {filteredEvents.length ? (
                    filteredEvents.map((event) => (
                        <div>
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