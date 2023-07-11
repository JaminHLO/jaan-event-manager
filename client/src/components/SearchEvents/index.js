import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import auth from "../../utils/auth";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_SEARCH_EVENTS, QUERY_ME } from "../../utils/queries";
import JaanMap from "../JaanMap";

const SearchEvents = () => {
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const [eventQuery, setEventQuery] = useState("");
    const [getEventQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_EVENTS);

    const [itemOffset, setItemOffset] = useState(0);

    const events = data?.searchEvents || [];
    // if (auth.loggedIn()) {
    // const userData = meData?.me || {}
    // }
    // console.log('meData is', meData);

    const userData = meData?.me || {}

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

    const handleSubmit = (event) => {
        event.preventDefault();
        getEventQuery({
            variables: { eventQuery }
        })
    }

    const latLngArray = [];
    // console.log('userData in SearchEvents is:', userData);
    // const userGeocode = userData?.geocode || `{ "lat": 0, "lng": 0 }`
    // const userGeocode = userData?.geocode
    // console.log(userGeocode)
    if (userData?.geocode) latLngArray.push(JSON.parse(userData?.geocode));
    if (events?.length) {
        events.map(event => {
            const eventGeocode = event?.geocode || `{ "lat": 0, "lng": 0 }`
            latLngArray.push(JSON.parse(eventGeocode))
        });
    }

    return (

        <div className="search-events text-white flex flex-col items-center justify-center">
            <div className="bg-black opacity-80 hover:opacity-90 transition ease-in-out delay-150 rounded-2xl min-w-[25rem] max-w-[25rem] text-center m-4">
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

            <div className="overflow-auto overflow-x-hidden bg-black opacity-80 hover:opacity-90 transition ease-in-out delay-150 rounded-2xl m-4 min-w-[25rem] max-w-[25rem] flex flex-col items-center max-h-[35rem]">
                <div className="m-4 w-full ">
                    <h3 className="text-3xl text-center m-3">Results:</h3>
                    <div className="flex justify-center">
                        <JaanMap latLngArray={latLngArray} />
                    </div>
                    <div className="text-white max-w-full rounded-2xl m-3 flex flex-col justify-center">
                        <p className="text-2xl text-center">List Of Events:</p>
                        {events.length ? (
                            currentItems.map((event) => (
                                <div className="text-xl border-solid border-2 border-white flex items-center flex-wrap rounded-xl m-3 p-3" key={event._id}>
                                    {!event.image ? (
                                        <img className="h-36 w-36 rounded-2xl"
                                            src="/images/event_default.jpg"
                                            alt='default event' />
                                    ) : (
                                        <img className="h-36 w-36 rounded-2xl"
                                            src={event.image}
                                            alt='single event' />
                                    )}
                                    <div className="m-5">
                                        <p className="my-1"><span className="font-bold">Event:</span> {event.title}</p>
                                        <p className="my-1"><span className="font-bold">Description:</span> {event.description}</p>
                                        {event.isAvailable
                                            ? <p className="text-xl"><span className="font-bold">Status:</span> <span className="text-green-500">Available</span></p>
                                            : <p className="text-xl"><span className="font-bold">Status:</span> <span className="text-red-500">Not Available</span></p>}
                                        <button className="bg-red-900 hover:bg-rose-900 rounded-xl my-1 p-1"><Link
                                            to={`/events/event/${event._id}`}
                                        >View Details</Link></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No matching event found</p>
                        )}
                    </div>
                    {events.length ? (
                        < ReactPaginate
                            className="flex justify-around m-5"
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