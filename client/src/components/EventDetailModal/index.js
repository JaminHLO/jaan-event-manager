import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_ME } from "../../utils/queries";
import { JOIN_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import Modal from 'react'

const EventDetailModal = ({showEventModal, setShowEventModal, singleEventData}) => {
    console.log('props', showEventModal, setShowEventModal, singleEventData)
    const modalRef = useRef()
    // const [showModal, setShowModal] = useState(props.show);
     const closeEventModal = e => {
        if(modalRef.current === e.target) {
            setShowEventModal(false)
        }
     }

    const [joinEvent, { error }] = useMutation(JOIN_EVENT);
    const [signedUp, setSignedUp] = useState(false)

    const eventId = singleEventData;
    console.log('event ID', singleEventData)

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
    })
    
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
                variables: { eventId: eventId }
            })
        } catch (error) {
            console.error(data)
        }
        console.log(data)
    };
    


    return (
        <>
        {showEventModal ? (
            <>
            <div className="bg-zinc-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                     {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                            Event details
                            </h3>
                            <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowEventModal(false)}
                            >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                            </button>
                        </div>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <div key={eventData._id} className="max-w-sm rounded overflow-hidden shadow-lg">
                        { !eventData.image ? (
                            <img className="w-full" 
                            src= './images/event_default.jpg' />
                            ) : (
                                <img className="w-full" 
                                src= {eventData.image} />
                            )}
                        </div>
                        <div className="px-6 py-4">
                            <div className='font-bold text-xl mb-2'>
                            {eventData.title}
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
                        {token ? (
                        signedUp ? (
                            <p>You're already signed up for his event!</p>
                            ) : (
                        <button
                            className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => { handleJoinEvent() }}
                            >Join Event 
                        </button>
                        )
                        ) : 
                        <p>Log in to Join!</p>}
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowEventModal(false)}
                    >
                      Close
                    </button>
                </div>
            </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
      </>
    )
}

export default EventDetailModal