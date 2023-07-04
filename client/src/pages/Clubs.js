import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CLUBS, QUERY_ME, QUERY_CATEGORIES } from "../utils/queries";
import auth from "../utils/auth";
import ClubByCategory from '../components/ClubByCategory'
import ClubList from "../components/ClubList";

const Clubs = () => {
    const [categoryId, setCategoryId] = useState('')
    const [updateClubs, setUpdateClubs] = useState('')

    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categoryData = data?.categories || {}
    console.log(categoryData)

    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const userData = meData?.me || {};
    console.log(userData)

    const { loading: clubLoading, data: clubData } = useQuery(QUERY_CLUBS);
    const clubs = clubData?.clubs || {};
    console.log(clubs)

    const handleClick = (id) => {
        console.log('categoryId', id)
        setCategoryId(id)

        const filteredClubs = []
        for(let i=0; i<clubs.length; i++) {
            if ((clubs[i].category?._id) === id) {
                filteredClubs.push(clubs[i])
            }
        }
        setUpdateClubs(filteredClubs)
        console.log('filtered', filteredClubs)
    };

    if (loading || meLoading) {
        return <div>Loading...</div>
    }

    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
        return false;
    }

    return (
        <div>
            <h3>Choose a Category</h3>
            {categoryData.map((category) => (
                <button
                    className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    key={category.id}
                    onClick={() => {
                        handleClick(category._id)
                    }}
                >
                    {category.name}
                </button>
            )
            )}
            {/* Use Club By Category if can filter from backend */}
            {/* < ClubByCategory categoryId={categoryId}/> */}
            <ClubList clubs={updateClubs} />)
        </div>
    )
}

export default Clubs;