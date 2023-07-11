import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_ME } from "../../utils/queries";
import { JOIN_EVENT, UPDATE_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import JaanMap from "../JaanMap";
import { saveEventIds, getSavedEventsIds } from "../../utils/localStorage";
import { getGeocode } from '../../utils/helpers';
import Calendar from 'react-calendar';
import { getFormattedDate } from '../../utils/helpers';
import events from "inquirer/lib/utils/events";


const EventDetail = () => {
  const { id: eventId } = useParams();

  const [displayMemberList, setDisplayMemberList] = useState("none");
  const [memberListOpen, setMemberListOpen] = useState(false);

  const handleMemberListDisplay = () => {
    if (!memberListOpen) {
      setDisplayMemberList("block");
      setMemberListOpen(true);
    } else {
      setDisplayMemberList("none");
      setMemberListOpen(false);
    }
  }

  const [eventEditform, setEventEditForm] = useState(
    {
      title: ``,
      address: ``,
      description: ``,
      dateTime: '',
      image: '',
      isAvailable: ""
    });
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId }
  });


  const eventData = data?.event || {};
  // console.log(eventData)

  const [date, setDate] = useState(
    (eventData?.dateTime) ?
      (new Date(eventData.dateTime))
      : (new Date())
  );


  useEffect(() => {
    setEventEditForm(
      {
        title: `${eventData?.title}`,
        address: `${eventData?.address}`,
        // dateTime: `${eventData?.dateTime}`, 
        image: `${eventData?.image}`,
        description: `${eventData?.description}`
      });
  }, [eventData])
  // console.log('club id', eventData.clubId)


  const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
  const userData = meData?.me || {};

  const [signedUp, setSignedUp] = useState(false)
  const [userInClub, setUserInClub] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [savedEventIds, setSavedEventIds] = useState(getSavedEventsIds());
  const [joinEvent, { error }] = useMutation(JOIN_EVENT, {
    refetchQueries: [
      { query: QUERY_ME }
    ]
  })
  const [updateEvent, { err }] = useMutation(UPDATE_EVENT, {
    refetchQueries: [
      {
        query: QUERY_EVENT,
        variables: { id: eventId }
      }
    ]
  })

  const stringToBoolean = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  }

  const handleEditEventChange = (event) => {
    const { name, value } = event.target;
    setEventEditForm({
      ...eventEditform,
      [name]: stringToBoolean(value),
    });
  };


  // prep eventData and userData for JaanMap
  // console.log('userData is', userData);
  // console.log('eventData is', eventData);
  const latLngArray = [];
  if (userData?.geocode) latLngArray.push(JSON.parse(userData.geocode));
  if (eventData?.geocode) latLngArray.push(JSON.parse(eventData.geocode));



  // Check if user has already signed up for the event
  let myEventsId = []
  for (let i = 0; i < userData.myEvents?.length; i++) {
    myEventsId.push(userData.myEvents[i]._id)
  }
  // console.log(eventData)
  useEffect(() => {
    if (myEventsId.includes(eventId)) {
      setSignedUp(true)
    } else {
      setSignedUp(false)
    }
    // console.log(signedUp)
  }, [eventId])

  //  Check if user belongs to the club of the event he wants to join
  let myClubsIds = []
  for (let i = 0; i < userData.myClubs?.length; i++) {
    myClubsIds.push(userData.myClubs[i]._id)
  }
  // console.log('my clubs:', myClubsIds)


  const eventClubId = eventData.clubId?._id
  // console.log('clubId for this event', eventClubId)


  useEffect(() => {
    if (myClubsIds.includes(eventClubId)) {
      setUserInClub(true)
    } else {
      setUserInClub(false)
    }
    // console.log(userInClub)
  }, [myClubsIds])


  useEffect(() => {
    return () => saveEventIds(savedEventIds);
  });


  // Check if the user is an admin of the club so he can edit the event
  let clubAdminId = eventData.clubId?.adminId
  let userId = userData?._id
  // console.log('adminId', clubAdminId, 'userId', userId)
  useEffect(() => {
    if (clubAdminId == userId) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [userData, eventData])
  // console.log(isAdmin)


  const token = Auth.loggedIn() ? Auth.getToken() : null;
  // console.log(token)


  const handleJoinEvent = async (event) => {
    // event.preventDefault();
    // console.log('clicked')
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
    // console.log('clicked edit')
    // console.log(eventEditform)
    try {
      const value = await getGeocode(eventEditform.address);
      // console.log("value is", value)


      setEventEditForm({
        ...eventEditform,
        geocode: value,
      });

      const { data } = await updateEvent({
        variables: {
          eventId: eventId,
          event: {
            ...eventEditform
            , geocode: value,
            dateTime: getFormattedDate(date)

          }
        }
      })
      console.log('updated event', data)
      setEventEditForm(
        {
          title: `${eventData?.title}`,
          address: `${eventData?.address}`,
          // dateTime: `${eventData?.dateTime}`, 
          image: `${eventData?.image}`,
          description: `${eventData?.description}`
        });
    } catch (error) {
      console.error(error)
    }
  }


  if (loading || meLoading) {
    return <div>Loading...</div>
  }


  return (
    <div className="event-page text-white flex justify-center items-center">
      <div className="lg:overflow-auto bg-black opacity-80 hover:opacity-90 rounded-2xl lg:w-8/12 xs:w-[90%] min-h-[40rem] lg:max-h-screen flex lg:flex-row xs:flex-col xs:m-5 items-center">
        <div className="lg:w-1/2 flex flex-col items-center text-center">

          <h3 className="text-3xl m-3">{eventData.title}</h3>
          {!eventData.image ? (
            <img className="m-3" src='/images/event_default.jpg' width="300px" />
          ) : (
            <img className="m-3" src={eventData.image} width="300px" />
          )}
          <p className="text-xl m-3"><span className="font-bold">Event Description:</span> {eventData.description}</p>
          <ul className='text-base'>
            <li className="text-xl m-3">Date and Time: {eventData.dateTime}</li>
            <li className="text-xl m-3">{eventData.address}</li>
            {eventData.isAvailable
              ? <li className="text-xl"><span className="font-bold">Status:</span> <span className="text-green-500">Available</span></li>
              : <li className="text-xl"><span className="font-bold">Status:</span> <span className="text-red-500">Not Available</span></li>}
          </ul>
          {token ? <Link className="m-1" to="/profile" >← Back to Profile</Link> : null}
          <Link to={`/clubs/club/${eventClubId}`}>← Club Details</Link>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          {token ? (
            userInClub ? (
              signedUp ? (
                <p className="text-xl m-2 xs:text-center">You are signed up for this event!</p>
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
            <button className="transition ease-in-out delay-150 bg-red-900 cursor-pointer rounded-xl p-2 m-2 hover:bg-rose-950"><Link to={`/login`}>Login to Join!</Link></button>
          )
          }
          <div className="m-3">
            <JaanMap latLngArray={latLngArray} />
            {userInClub && <div>
              <button
                className={`bg-transparent hover:text-red-900 text-white font-bold py-2 px-4 rounded-2xl ${memberListOpen ? "text-sm" : ""
                  }`}
                onClick={handleMemberListDisplay}
              >View Participants ▾</button>
              <div style={{ display: displayMemberList }}>
                {eventData.participants.map(participant => {
                  return (
                    <p key={participant._id}>▸ {participant.name}</p>
                  )
                })}
              </div>
            </div>}
          </div>
          {isAdmin ? (
            <button
              className="lg:m-3 xs:m-4 bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-rose-900 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={() => { setShowModal(true) }}
            >
              Edit Event
            </button>
          ) : null
          }
        </div>
      </div>


      {/* Modal to Edit Event */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
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
                        className="text-white modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                        placeholder="title"
                        name="title"
                        type="text"
                        id="title"
                        // defaultValue={eventData?.title}
                        onChange={handleEditEventChange}
                        value={eventEditform.title}
                      />
                    </div>
                    <div className="flex-row space-between my-2">
                      <label htmlFor="address">Location:</label>
                      <input
                        className="text-white modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
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
                      <div className="bg-red-800 opacity-80 rounded-xl p-3 w-80">
                        <Calendar onClickDay={setDate} minDate={new Date()} value={date} />
                        <div className='text-center fw-bold'>Selected Date:{' '}{date.toDateString()}</div>
                      </div>
                      {/* <input
                        className="text-white modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                        placeholder="Choose a date for your event"
                        name="dateTime"
                        type="text"
                        id="dateTime"
                        onChange={handleEditEventChange}
                        value={eventEditform.dateTime}
                      /> */}
                    </div>
                    <div className="flex-row space-between my-2">
                      <label htmlFor="description">Description:</label>
                      <textarea
                        className="text-white modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                        placeholder="Enter a short description of your event"
                        name="description"
                        onChange={handleEditEventChange}
                        value={eventEditform.description}
                      ></textarea>
                      {/* </div>
                            <label htmlFor="image">Image:</label>
                            <input
                                className="text-white modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                placeholder="Image link"
                                name="image"
                                type="text"
                                id="image"
                                onChange={handleEditEventChange}
                                value={eventEditform.image}
                            />
                        <div> */}
                    </div>
                    <div className="flex-row space-between my-2">
                      <label htmlFor="isAvailable">Status:</label>
                      <select
                        className="text-white modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                        id="isAvailable"
                        value={eventEditform.isAvailable}
                        onChange={handleEditEventChange}
                        name="isAvailable"
                      >
                        <option value="">--Update Status--</option>
                        <option value="true">Still available</option>
                        <option value="false">No longer available</option>
                      </select>
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
    </div>
  )
}


export default EventDetail