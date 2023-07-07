import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_ME } from "../../utils/queries";
import { JOIN_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { saveEventIds, getSavedEventsIds } from "../../utils/localStorage";

const EventDetail = () => {
    const { id: eventId } = useParams();

    const [savedEventIds, setSavedEventIds] = useState(getSavedEventsIds());
    const [joinEvent, { error }] = useMutation(JOIN_EVENT, {
        refetchQueries : [
          {
            query: QUERY_ME
          }
        ]
      })
    const [signedUp, setSignedUp] = useState(false)
    const [userInClub, setUserInClub] = useState(false)

    console.log('event ID', eventId)

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

    // Check if user has already signed up for the event
    useEffect(() => {
        if (myEventsId.includes(eventId)) {
            setSignedUp(true)
        } else {
            setSignedUp(false)
        }
        console.log(signedUp)
    }, [eventId])
    
    let myClubsEvents = []
    for (let i=0; i < userData.myClubs?.length; i++) {
        for (let j=0; j < userData.myClubs[i].events?.length; j++) {
            myClubsEvents.push(userData.myClubs[i].events[j]._id)
        }
    }
    console.log('my clubs events:', myClubsEvents)

    // Check if user belongs to the club of the event he wants to join
    useEffect(() => {
        if(myClubsEvents.includes(eventId)){
            setUserInClub(true)
        } else {
            setUserInClub(false)
        }
        console.log(userInClub)
    }, [myClubsEvents])

    useEffect(() => {
        return () => saveEventIds(savedEventIds);
      });

    if (loading || meLoading) {
        return <div>Loading...</div>
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token)

    const handleJoinEvent = async (event) => {
        // event.preventDefault();
        console.log('clicked')
        try {
            const { data } = await joinEvent({
                variables: { eventId }
            })
            setSavedEventIds([...savedEventIds, eventId]);
        } catch (error) {
            console.error(data)
        }
        console.log(data)
    };
    
    return (
        <>
            <Link to="/profile" >← Back to Profile</Link>
            <h3>{eventData.title}</h3>
                { !eventData.image ? (
                    <img className="w-full" 
                    src= './images/event_default.jpg' />
                    ) : (
                    <img className="w-full" 
                    src= {eventData.image} />
                    )}
                    <p>{eventData.description}</p>
                        <ul className='text-gray-700 text-base'>
                            <li>Date and Time: {eventData.dateTime}</li>
                            <li>{eventData.address}</li>
                            {eventData.isAvailable 
                                ? <li>Available</li>
                                : <li>Not Available</li>}
                        </ul>
                        {token ? (
                            userInClub ? (
                                signedUp ? (
                                    <p>You're already signed up for his event!</p>
                                  ) : (
                                    <button
                                        disabled={savedEventIds?.some((savedEventId) => savedEventId === eventId)}
                                        className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { handleJoinEvent() }}>
                                        {savedEventIds?.some((savedEventId) => savedEventId === eventId)
                                        ? 'You have joined this event!'
                                        : 'Join event!'}     
                                    </button>
                                ) 
                                ) : (
                                    <p>Join the club to add this event</p>
                                )
                        ) : 
                        <p>Log in to Join!</p>}
        </>
    )
}

export default EventDetail