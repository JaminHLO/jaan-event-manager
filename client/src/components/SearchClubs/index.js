import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useLazyQuery } from "@apollo/client";
import { QUERY_SEARCH_CLUBS } from "../../utils/queries";

const SearchClubs = () => {
    const [clubQuery, setClubQuery] = useState("");
    const [getClubQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_CLUBS);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const clubs = data?.searchClubs || []

    const itemsPerPage = 10;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = clubs.slice(startIndex, endIndex);

    const paginate = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
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

    return (
        <div>
            <h2>Search for a club:</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Search for a club:</label>
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
                {clubs.length ? (
                    clubs.map((club) => (
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
                        onPageChange={paginate}
                        pageCount={Math.ceil(clubs.length / itemsPerPage)}
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
        </div >
    )
}

export default SearchClubs;