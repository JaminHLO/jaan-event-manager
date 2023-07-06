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
        for (let i = 0; i < clubs.length; i++) {
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
        <div className="profile">
            <div>
                <h3 className="text-white text-3xl text-center p-4">Choose a Category</h3>
                <div className="bg-black opacity-80 min-h-[22rem] rounded-2xl m-4 flex flex-wrap justify-center">
                    {categoryData.map((category) => (
                        <button
                            className="w-44 bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl m-4"
                            key={category.id}
                            onClick={() => {
                                handleClick(category._id)
                            }}
                        >
                            {category.name}
                        </button>
                    )
                    )}
                </div>
                {/* Use Club By Category if can filter from backend */}
                {/* < ClubByCategory categoryId={categoryId}/> */}
                <div className="bg-black opacity-80 min-h-[22rem] rounded-2xl m-4 flex justify-center items-center overflow-auto">
                    <p className="text-white text-2xl">
                        <ClubList clubs={updateClubs} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Clubs;