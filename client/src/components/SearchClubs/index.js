import React, { useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { QUERY_SEARCH_CLUBS } from "../../utils/queries";

const SearchClubs = () => {
    const [clubQuery, setClubQuery] = useState("");
    const [getClubQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH_CLUBS);

    const clubs = data?.searchClubs || {}

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
                            <button>View Details</button>
                        </div>
                    ))
                ) : (
                    <p>No matching club found</p>
                )}
            </div>
        </div>
    )
}

export default SearchClubs;