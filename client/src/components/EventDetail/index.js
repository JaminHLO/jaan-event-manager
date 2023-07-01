import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_ME } from "../../utils/queries";
import { JOIN_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

const EventDetail = () => {

    // const [addEvent, { error }] = useMutation(JOIN_EVENT);

    const { id: eventId } = useParams();
    console.log(eventId)

    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { id: eventId }
    });

    const eventData = data?.event || {};
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);

    const userData = meData?.me || {};


    // Check if user has already sign for the event
    //     let myEventsID = userData.myEvents.id
    //     console.log(myEventsID)
    //     if (myEventsID.contain(eventData._id)) {
    //         setJoinedEvent(true)

    console.log(userData)
    console.log(eventData)
    // console.log(joinedEvent)
    if (loading || meLoading) {
        return <div>Loading...</div>
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token)

    const handleJoinEvent = async (event) => {
        // event.preventDefault();
        // try {
            console.log('clicked')
            // const { data } = await addEvent({
            //     variables: {
            //         id: eventId,
            //     }
            }
            // )
        // } catch (error) {
            // console.error(error)
        // }
    // };



    return (
        <div>
            <h3>{eventData.title}</h3>
            <p>{eventData.description}</p>
            {token ? (
                <button
                    className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { handleJoinEvent(true) }}
                >Join Event </button>
            ) : null}

        </div>
    )
}

export default EventDetail;