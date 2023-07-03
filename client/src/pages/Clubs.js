import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CLUBS, QUERY_ME, QUERY_CATEGORIES } from "../utils/queries";
import auth from "../utils/auth";
import ClubByCategory from '../components/ClubByCategory'

const Clubs = () => {
    const [categoryId, setCategoryId] = useState('')

    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categoryData = data?.categories || {}
    console.log(categoryData)

    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const userData = meData?.me || {};
    console.log(userData)

    const handleClick = (id) => {
        console.log('categoryId', id)
        setCategoryId(id)
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
            < ClubByCategory categoryId={categoryId}/>
        </div>
    )
}

export default Clubs;