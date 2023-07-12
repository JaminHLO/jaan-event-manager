import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_SEARCH_CLUBS, QUERY_ME } from "../../utils/queries";
import JaanMap from "../JaanMap";

const SearchClubs = () => {
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const [clubQuery, setClubQuery] = useState("");
    const [getClubQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_CLUBS);

    const [itemOffset, setItemOffset] = useState(0);

    const clubs = data?.searchClubs || []

    const userData = meData?.me || {}
    // console.log('meData is', meData);

    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = clubs.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(clubs.length / itemsPerPage)

    const paginate = (event) => {
        const newOffset = (event.selected * itemsPerPage) % clubs.length;
        setItemOffset(newOffset);
    }

    const handleChange = (event) => {
        setClubQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getClubQuery({
            variables: { clubQuery }
        })
    }

    const latLngArray = [];
    // console.log('userData in SearchClubs is:', userData);
    // const userGeocode = userData?.geocode || `{ "lat": 0, "lng": 0 }`
    const userGeocode = userData?.geocode
    if (userGeocode) latLngArray.push(JSON.parse(userGeocode));
    if (clubs?.length) {
        clubs.map(club => {
            const clubGeocode = club?.geocode || `{ "lat":38.889484, "lng":-77.035278}`
            latLngArray.push(JSON.parse(clubGeocode));
        });
    }

    return (
        <div className="search-events text-white flex flex-col items-center justify-center">
            <div className="bg-black opacity-80 hover:opacity-90 transition ease-in-out delay-150 rounded-2xl lg:w-1/2 text-center m-4">
                <h2 className="text-3xl m-2">Search for a club</h2>
                <div className="m-4">
                    <form onSubmit={handleSubmit}>
                        <label></label>
                        <input
                            className="search-event-input rounded-xl p-2"
                            type="text"
                            placeholder="Find an club here"
                            onChange={handleChange}
                            name="clubQuery"
                            value={clubQuery}
                        ></input>
                        <button className="bg-red-900 hover:bg-rose-900 rounded-xl p-2 m-2" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className="overflow-auto overflow-x-hidden bg-black opacity-80 hover:opacity-90 transition ease-in-out delay-150 rounded-2xl m-4 lg:w-1/2 flex flex-col items-center lg:max-h-[35rem]">
                <div className="m-4 w-full">
                    <h3 className="text-3xl text-center m-3">Results</h3>
                    <div className="flex justify-center">
                        <JaanMap latLngArray={latLngArray} />
                    </div>
                    <div className="text-white max-w-full rounded-2xl m-3">
                        <p className="text-2xl text-center">List Of Clubs:</p>
                        {clubs.length ? (
                            currentItems.map((club) => (
                                <div className="text-xl border-solid border-2 border-white flex items-center xs:justify-center lg:justify-start flex-wrap rounded-xl m-3 p-3" key={club._id}>
                                    {!club.image ? (
                                        <img className="h-36 w-36 rounded-2xl"
                                            src="/images/event_default.jpg"
                                            alt='default club' />
                                    ) : (
                                        <img className="h-36 w-36 rounded-2xl"
                                            src={club.image}
                                            alt='single club' />
                                    )}
                                    <div className="m-5 xs:text-center lg:text-left">
                                        <p className="my-1"><span className="font-bold">Club:</span> {club.title} </p>
                                        <p className="my-1"><span className="font-bold">Description:</span> {club.description}</p>
                                        <p className="my-1"><span className="font-bold">Spots Available:</span> {club.spotsAvailable}</p>
                                        <button className="bg-red-900 hover:bg-rose-900 rounded-xl my-1 p-1"><Link
                                            to={`/clubs/club/${club._id}`}
                                        >View Details</Link></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No matching club found</p>
                        )}
                    </div>
                    {clubs.length ? (
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
        </div >
    )
}

export default SearchClubs;