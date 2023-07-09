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
    console.log('userData in SearchClubs is:', userData);
    if (userData?.geocode) latLngArray.push(JSON.parse(userData.geocode));
    if (clubs?.length) {
        clubs.map(event => latLngArray.push(JSON.parse(event.geocode)));
    }

    return (
        <div>
            <h2>Search for a club:</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    {/* <label>Search for a club:</label> */}
                    <input
                        type="text"
                        placeholder="Find an club here"
                        onChange={handleChange}
                        name="clubQuery"
                        value={clubQuery}
                    ></input>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                <h3>Results</h3>
                <JaanMap latLngArray={latLngArray} />
                {clubs.length ? (
                    currentItems.map((club) => (
                        <div key={club._id}>
                            <p>{club.title}</p>
                            <Link
                                to={`/clubs/club/${club._id}`}
                            >View Details</Link>
                        </div>
                    ))
                ) : (
                    <p>No matching club found</p>
                )}
                {clubs.length ? (
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
        </div >
    )
}

export default SearchClubs;