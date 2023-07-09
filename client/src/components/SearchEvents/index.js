import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_SEARCH_EVENTS, QUERY_ME } from "../../utils/queries";
import JaanMap from "../JaanMap";

const SearchEvents = () => {
    const [eventQuery, setEventQuery] = useState("");
    const { meLoading, meData } = useQuery(QUERY_ME)
    const [getEventQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_EVENTS);

    const [itemOffset, setItemOffset] = useState(0);

    const events = data?.searchEvents || [];

    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = events.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(events.length / itemsPerPage)

    const paginate = (event) => {
        const newOffset = (event.selected * itemsPerPage) % events.length;
        setItemOffset(newOffset);
    }

    const handleChange = (event) => {
        setEventQuery(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        getEventQuery({
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
                    currentItems.map((event) => (
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
                {events.length ? (
                    < ReactPaginate
                        breakLabel="..."
                        onPageChange={paginate}
                        pageCount={pageCount}
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        pageRangeDisplayed={5}
                        renderOnZeroPageCount={null}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default SearchEvents;