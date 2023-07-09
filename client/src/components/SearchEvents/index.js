import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_SEARCH_EVENTS, QUERY_ME } from "../../utils/queries";
import JaanMap from "../JaanMap";

const SearchEvents = () => {
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const [eventQuery, setEventQuery] = useState("");
    const [getEventQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_EVENTS);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const events = data?.searchEvents || [];

    const userData = meData?.me || {}
    // console.log('meData is', meData);

    const itemsPerPage = 10;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = events.slice(startIndex, endIndex);

    const paginate = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
    }

    const handleChange = (event) => {
        setEventQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getEventQuery({
            variables: { eventQuery }
        })
    }

    const latLngArray = [];
    // console.log('userData in SearchEvents is:', userData);
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
                            events.map((event) => (

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
                            onPageChange={paginate}
                            pageCount={Math.ceil(events.length / itemsPerPage)}
                            previousLabel={'Prev'}
                            nextLabel={'Next'}
                            containerClassName={'pagination'}
                            pageLinkClassName={'page-number'}
                            previousLinkClassName={'page-number'}
                            nextLinkClassName={'page-number'}
                            activeLinkClassName={'active'}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default SearchEvents;