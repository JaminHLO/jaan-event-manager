import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_ME } from "../../utils/queries";
import { JOIN_EVENT, UPDATE_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import JaanMap from "../JaanMap";
import { saveEventIds, getSavedEventsIds } from "../../utils/localStorage";
import { getGeocode } from '../../utils/helpers'; 

const EventDetail = () => {
  const { id: eventId } = useParams();
  const [eventEditform, setEventEditForm] = useState({ title: ``, address: ``, description:``, dateTime:'', image: ''});
  const { loading, data } = useQuery(QUERY_EVENT, {
      variables: { id: eventId }
  });

  const eventData = data?.event || {};

  useEffect(() => {
  setEventEditForm({ title: `${eventData?.title}`, address: `${eventData?.address}`, dateTime: `${eventData?.dateTime}`, image:`${eventData?.image}`, description:`${eventData?.description}`});
  }, [eventData])
  console.log('club id', eventData.clubId)

  const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
  const userData = meData?.me || {};
  
  const [signedUp, setSignedUp] = useState(false)
  const [userInClub, setUserInClub] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showModal, setShowModal] = useState(false);
  // const [eventEditform, setEventEditForm] = useState({ title: `${eventData?.title}`, address: `${eventData?.address}`, date: `${eventData?.dateTime}`, image:`${eventData?.image}`, description:`${eventData?.description}`, geocode: ``});
  const [savedEventIds, setSavedEventIds] = useState(getSavedEventsIds());
  const [joinEvent, { error }] = useMutation(JOIN_EVENT, {
    refetchQueries : [
      { query: QUERY_ME }
      ]
      })
      const [updateEvent, { err }] = useMutation(UPDATE_EVENT, {
        refetchQueries : [
          { query: QUERY_EVENT,
          variables: { id: eventId } }
        ]
      })

    const handleEditEventChange = (event) => {
        const { name, value } = event.target;
        setEventEditForm({
          ...eventEditform,
          [name]: value,
        });
      };

    // prep eventData and userData for JaanMap
    console.log('userData is', userData);
    console.log('eventData is', eventData);
    const latLngArray = [];
    if (userData?.geocode) latLngArray.push(JSON.parse(userData.geocode));
    if (eventData?.geocode) latLngArray.push(JSON.parse(eventData.geocode));

    
   // Check if user has already signed up for the event
      let myEventsId = []
      for (let i=0; i < userData.myEvents?.length; i++) {
        myEventsId.push(userData.myEvents[i]._id)
      }
      console.log(eventData)
      useEffect(() => {
        if (myEventsId.includes(eventId)) {
            setSignedUp(true)
        } else {
            setSignedUp(false)
        }
        console.log(signedUp)
      }, [eventId])
    
    //  Check if user belongs to the club of the event he wants to join
    let myClubsIds = []
    for (let i=0; i < userData.myClubs?.length; i++) {
            myClubsIds.push(userData.myClubs[i]._id)
    }
    console.log('my clubs:', myClubsIds)

    let eventClubId = eventData.clubId?._id
    console.log('clubId for this event', eventClubId)

    useEffect(() => {
        if(myClubsIds.includes(eventClubId)){
            setUserInClub(true)
        } else {
            setUserInClub(false)
        }
        console.log(userInClub)
    }, [myClubsIds])

    useEffect(() => {
        return () => saveEventIds(savedEventIds);
      });

    // Check if the user is an admin of the club so he can edit the event
    let clubAdminId = eventData.clubId?.adminId
    let userId = userData?._id
    console.log('adminId', clubAdminId, 'userId', userId)
    useEffect(() => {
        if(clubAdminId == userId){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [userData, eventData])
    console.log(isAdmin)

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
            console.error(error)
        }
        console.log(data)
    };

    const handleEditEvent = async (event) => {
        // event.preventDefault();
        console.log('clicked edit')
        try {
            const value = await getGeocode(eventEditform.address);
            console.log("value is", value)

                setEventEditForm({
                ...eventEditform,
                geocode: value,
                });
            
            const { data } = await updateEvent({
                variables: {
                eventId: eventId,
                event: { ...eventEditform
                  , geocode: value
                 }
              }})
            console.log('updated event', data)
            setEventEditForm({ title: `${eventData?.title}`, address: `${eventData?.address}`, dateTime: `${eventData?.dateTime}`, image:`${eventData?.image}`, description:`${eventData?.description}`});
          } catch (error) {
                console.error(error)
            }
        }

    if (loading || meLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Link to="/profile" >← Back to Profile</Link>
            <h3>{eventData.title}</h3>
                { !eventData.image ? (
                    <img className="" src= '/images/event_default.jpg' width="300px" />
                    ) : (
                    <img  src= {eventData.image} width="300px" />
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
                        ) : (
                            <p>Log in to Join!</p>
                        )
                        }
                        {token ? (
                            isAdmin ? (
                                <button
                                className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => { setShowModal(true) }}
                                >
                                    Edit Event
                                </button>
                            ) :  null 
                        ) : null
                    }
                        <JaanMap latLngArray={latLngArray} />
        
        {/* Modal to Edit Event */}
            {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Update Event
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleEditEvent}>
                      <div className="flex-row space-between my-2">
                        <label htmlFor="title">Title:</label>
                        <input
                          placeholder="title"
                          name="title"
                          type="text"
                          id="title"
                          defaultValue={eventData?.title}
                          onChange={handleEditEventChange}
                          value={eventEditform.title}
                        />
                      </div>
                      <div className="flex-row space-between my-2">
                            <label htmlFor="address">Location:</label>
                            <input
                                placeholder="Where is this event taking place?"
                                name="address"
                                type="text"
                                id="address"
                                onChange={handleEditEventChange}
                                value={eventEditform.address}
                            />
                        </div>
                        <div className="flex-row space-between my-2">
                            <label htmlFor="dateTime">Date:</label>
                            <input
                                placeholder="Choose a date for your event"
                                name="dateTime"
                                type="text"
                                id="dateTime"
                                onChange={handleEditEventChange}
                                value={eventEditform.dateTime}
                            />
                        </div>
                        <div className="flex-row space-between my-2">
                            <textarea
                                placeholder="Enter a short description of your event"
                                name="description"
                                onChange={handleEditEventChange}
                                value={eventEditform.description}
                            ></textarea>
                        </div>
                            <label htmlFor="image">Image:</label>
                            <input
                                placeholder="Image link"
                                name="image"
                                type="text"
                                id="image"
                                onChange={handleEditEventChange}
                                value={eventEditform.image}
                            />
                        <div>

                        </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => {
                        handleEditEvent()
                        setShowModal(false)
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}  
        </>
    )
}

export default EventDetail