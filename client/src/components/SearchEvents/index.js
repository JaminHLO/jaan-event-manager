import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { QUERY_SEARCH_EVENTS } from "../../utils/queries";

const SearchEvents = () => {
    const [eventQuery, setEventQuery] = useState("");
    const [getEventQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_EVENTS);

    const events = data?.searchEvents || {};
    console.log(events)

    const handleChange = (event) => {
        setEventQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getEventQuery({
            variables: { eventQuery }
        })
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
                {events.length ? (
                    events.map((event) => (
                        <div key={event._id}>
                            <p>{event.title}</p>
                            <Link
                                to={`/events/event/${event._id}`}
                            >View Details</Link>
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