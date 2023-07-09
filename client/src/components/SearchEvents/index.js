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
        <div className="search-events text-white flex flex-col items-center justify-center">
            <div className="bg-black opacity-70 hover:opacity-80 rounded-2xl w-1/2 text-center m-4">
                <h2 className="text-3xl m-2">Search for an event</h2>
                <div className="m-4">
                    <form onSubmit={handleSubmit}>
                        <label></label>
                        <input
                            className="search-event-input rounded-xl p-2"
                            type="text"
                            placeholder="Find an event here"
                            onChange={handleChange}
                            name="eventQuery"
                            value={eventQuery}
                        ></input>
                        <button className="bg-red-900 hover:bg-rose-900 rounded-xl p-2 m-2" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div className="bg-black opacity-70 hover:opacity-80 rounded-2xl m-4 w-1/2 flex flex-col items-center max-h-screen">
                <div className="m-4 text-center">
                    <h3 className="text-3xl m-3">Results:</h3>
                    <JaanMap latLngArray={latLngArray} />
                    <div className="text-black bg-white max-w-full rounded-2xl m-3">
                        {events.length ? (
                            currentItems.map((event) => (
                                <div key={event._id}>
                                    <p className="text-2xl">List Of Events:</p>
                                    <p className="text-xl m-4">Title: {event.title} </p>
                                    <button className="bg-red-900 rounded-xl p-2"><Link
                                        to={`/events/event/${event._id}`}
                                    >View Details</Link></button>
                                </div>
                            ))
                        ) : (
                            <p>No matching event found</p>
                        )}
                    </div>
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
        </div>
    )
}

export default SearchEvents;