import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_ME } from "../../utils/queries";
import { JOIN_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
let signedUp = true    

const EventDetail = () => {

    const [joinEvent, { error }] = useMutation(JOIN_EVENT);
    // const [signedUp, setSignedUp] = useState(false)

    const { id: eventId } = useParams();
    console.log(eventId)

    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { id: eventId }
    });

    const eventData = data?.event || {};
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);

    const userData = meData?.me || {};

    let myEventsId = []
    for (let i=0; i < userData.myEvents?.length; i++) {
        myEventsId.push(userData.myEvents[i]._id)
    }
    console.log(eventData)

    // Check if user has already sign for the event
    if (myEventsId.includes(eventId)) {
        // setSignedUp(true)
        signedUp = true    
    }
        console.log(signedUp)
    
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
            <div key={eventData._id} className="max-w-sm rounded overflow-hidden shadow-lg">
              { !eventData.image ? (
                <img className="w-full" 
                    src= './images/event_default.jpg' />
                ) : (
                    <img className="w-full" 
                    src= {eventData.image} />
                )}
                <div className="px-6 py-4">
                    <div className='font-bold text-xl mb-2'>
                    {eventData.title}
                </div>
                <p className='text-gray-700 text-base'>
                {eventData.description}
                </p>
                <ul className='text-gray-700 text-base'>
                    <li>Date and Time: {eventData.dateTime}</li>
                    <li>{eventData.address}</li>
                    {eventData.isAvailable 
                        ? <li>Available</li>
                        : <li>Not Available</li>}
                </ul>
            </div>
             {token ? (
                signedUp ? (
                    <p>You're already signed up for his event!</p>
                    ) : (
                <button
                    className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { handleJoinEvent(true) }}
                    >Join Event 
                </button>
                )
                ) : 
                <p>Log in to Join!</p>}

        </div>
    </div>
    )
}

export default EventDetail;