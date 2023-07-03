import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_CLUBS } from "../../utils/queries";
import ClubList from "../ClubList";

const ClubByCategory = (props) => {
    
    console.log('categoryId --', props.categoryId)
    const category = props.categoryId
    
    const { loading, data } = useQuery(QUERY_CLUBS, {
        variables: { category: category }
    });

    const clubsData = data?.club || {};
    console.log('clubs data--', clubsData)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3>list of clubs</h3>
            {/* <ClubList/> */}
        </div>
    )
}

export default ClubByCategory