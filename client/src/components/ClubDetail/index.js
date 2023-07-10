import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_CLUB, QUERY_ME, QUERY_CHECKOUT } from "../../utils/queries";
import { ADD_EVENT, UPDATE_CLUB } from "../../utils/mutations";
import Cart from "../Cart";
import auth from "../../utils/auth";
import JaanMap from "../JaanMap";
import { idbPromise, getGeocode } from "../../utils/helpers";
import Notification from "../Notification";
import Calendar from 'react-calendar';
import { getFormattedDate } from '../../utils/helpers';


const stripePromise = loadStripe(
    'pk_test_51NNi4mBTDevFCiGQvy6JTMqQQ8UpkUSfhPkbq9VlNb5f0zKttPUMO2EKirlmPST1ttc8JlggwW8AAaO2S1yz8uiG00nN0DWcxK');


const ClubDetail = () => {
    const { id: clubIdParam } = useParams();
    const [clubEditform, setClubEditForm] = useState({ title: ``, maxMembers: ``, description: ``, price: '', image: '' });

    const [date, setDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const [isMember, setIsMember] = useState();
    const [addEvent, { error }] = useMutation(ADD_EVENT, {
        refetchQueries: [
            {
                query: QUERY_CLUB,
                variables: { id: clubIdParam }
            }
        ]
    });
    const [getCheckout, { data: checkoutData }] = useLazyQuery(QUERY_CHECKOUT);
    const [eventFormState, setEventFormState] = useState(
        {
            title: "",
            address: "",
            dateTime: "",
            description: "",
            image: "",
            geocode: ""
        })


    const { loading, data } = useQuery(QUERY_CLUB, {
        variables: { id: clubIdParam }
    });


    const clubData = data?.club || {};
    console.log(clubData)
    const clubEvents = clubData.events


    useEffect(() => {
        setClubEditForm({ title: `${clubData?.title}`, maxMembers: `${clubData?.maxMembers}`, price: `${clubData?.price}`, image: `${clubData?.image}`, description: `${clubData?.description}` });
    }, [clubData])


    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const userData = meData?.me || {};


    const latLngArray = [];
    if (userData?.geocode) latLngArray.push(JSON.parse(userData.geocode));
    if (clubData?.geocode) latLngArray.push(JSON.parse(clubData.geocode));
    
    const userClubsId = []
    for (let i=0; i<userData?.myClubs?.length; i++) {
        userClubsId.push(userData.myClubs[i]._id)
    }
    console.log(userClubsId)

    // useEffect for calendar?

    useEffect(() => {
        if (userClubsId.includes(clubData._id)) {
            setIsMember(true)
        } else {
            setIsMember(false);
        }
    }, [clubData.adminId])

    useEffect(() => {
        if (checkoutData) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: checkoutData.checkout.session })
            })
        }
    }, [checkoutData]);


    useEffect(() => {
        if (userData._id === clubData.adminId) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false);
        }
    }, [clubData.adminId])


    const [updateClub, { err }] = useMutation(UPDATE_CLUB, {
        refetchQueries: [
            {
                query: QUERY_CLUB,
                variables: { id: clubIdParam }
            }
        ]
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setEventFormState({
            ...eventFormState,
            [name]: value,
        })
    }


    const handleEditClubChange = (event) => {
        const { name, value } = event.target;
        setClubEditForm({
            ...clubEditform,
            [name]: value,
        });
    };


    const token = auth.loggedIn() ? auth.getToken() : null;
    // if (!token) {
    //     return false;
    // }


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const geoEventAddress = await getGeocode(eventFormState.address);
            // const geoEventAddressString = JSON.stringify(geoEventAddress);
            console.log("geoEventAddress is:", geoEventAddress);
            const { data } = await addEvent({
                // was
                // variables: {
                //     event: eventFormState,
                //     clubId: clubIdParam,
                //     geocode: geoEventAddress
                // }
                variables: {
                    event: {
                        ...eventFormState,
                        geocode: geoEventAddress,
                        dateTime: getFormattedDate(date)
                    },
                    clubId: clubIdParam
                }
            });
            return data;
        } catch (error) {
            console.error(error)
        }
    };


    function submitCheckout() {
        console.log("clicked")
        const clubIds = [clubData._id];
        getCheckout({
            variables: { clubs: clubIds }
        });
        idbPromise("clubs", "put", clubData);
    }

    if (loading || meLoading) {
        return <div>Loading...</div>
    }


    const handleEditClub = async (event) => {
        // event.preventDefault();
        console.log('clicked edit', clubIdParam, clubEditform)
        try {
            const { data } = await updateClub({
                variables: {
                    clubId: clubIdParam,
                    club: {
                        title: clubEditform.title.toString(),
                        maxMembers: parseInt(clubEditform.maxMembers),
                        image: clubEditform.image.toString(),
                        price: parseFloat(clubEditform.price),
                        description: clubEditform.description.toString()
                    }
                }
            })
            console.log('updated club', data)
            setClubEditForm({ title: `${clubData?.title}`, maxMembers: `${clubData?.maxMembers}`, price: `${clubData?.price}`, image: `${clubData?.image}`, description: `${clubData?.description}` });
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="club-details text-white flex justify-center items-center">
            <Notification clubData={clubData} userData={userData} />

            <div className="transition ease-in-out delay-150 bg-black opacity-80 hover:opacity-90 max-w-[25rem] rounded-2xl h-[30rem] mr-[5rem]">
                <div className="p-4">
                    <JaanMap latLngArray={latLngArray} />
                </div>
                <div className="text-center">
                    {auth.loggedIn() && isAdmin ? (
                        <>
                            <button
                                className="mb-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => { setShowModal(true) }}
                            >Create an event</button>
                            <button
                                className="mb-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => { setShowEditModal(true) }}
                            >Edit club</button>
                        </>
                    ) : null}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-auto resize-y flex transition ease-in-out delay-150 bg-black opacity-80 hover:opacity-90 rounded-2xl w-[60rem] h-[18rem] mb-4">
                    <div>
                        <img className="h-[100%] w-[100%] rounded-2xl" src={clubData.image ? clubData.image : '/images/club_default.jpg'}></img>
                    </div>
                    <div className="ml-10 m-5">
                        <h3 className="text-3xl m-2">{clubData.title}</h3>


                        <p className="text-xl m-2">About: {clubData.description}</p>
                        <p className="text-xl m-2">Membership Price: ${clubData.price}</p>
                        <p className="text-xl m-2">Spots Available: {clubData.spotsAvailable}</p>
                        {token ? (
                            !isMember ? (
                            <button className="transition ease-in-out delay-150 bg-red-900 cursor-pointer rounded-xl p-2 m-3 hover:bg-rose-950" onClick={submitCheckout}>Purchase Membership</button>
                            ) : null
                            ) : (
                            <button className="transition ease-in-out delay-150 bg-red-900 cursor-pointer rounded-xl p-2 m-3 hover:bg-rose-950"><Link to={`/login`}>Login to Join!</Link></button>
                        )}
                    </div>
                </div>
                <div className="overflow-auto resize-y flex flex-col transition ease-in-out delay-150 bg-black opacity-80 hover:opacity-90 rounded-2xl w-[60rem] h-[18rem] mb-4">
                    <h2 className="text-3xl text-center m-4">List of Events</h2>
                    <ul className="list-disc list-none">
                        {clubData.events?.length !== 0 ? (


                            clubEvents.map((singleEvent) => (
                                <li className="border-solid border-2 border-white hover:bg-white hover:text-black rounded-xl m-3 p-3">
                                    <Link to={`/events/event/${singleEvent._id}`}>
                                        <span className="font-bold">Event:</span> {singleEvent.title} <span className="font-bold">Date:</span> {singleEvent.dateTime}
                                    </Link>
                                </li>
                            ))) : (
                            <p className="m-3">No events have been listed for this club</p>
                        )
                        }
                    </ul>
                </div>

            </div>

            {showModal &&
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold text-black">
                                    Create an Event
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="flex-row space-between my-2">
                                        <label htmlFor="title"></label>
                                        <input
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Title for Event"
                                            name="title"
                                            type="text"
                                            id="title"
                                            onChange={handleChange}
                                            value={eventFormState.title}
                                        />
                                    </div>
                                    <div className="flex-row space-between my-2">
                                        <label htmlFor="address"></label>
                                        <input
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Where is this event taking place?"
                                            name="address"
                                            type="text"
                                            id="address"
                                            onChange={handleChange}
                                            value={eventFormState.address}
                                        />
                                    </div>
                                    <div className="flex-row space-between my-2">
                                        <label htmlFor="image"></label>
                                        <input
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Image Link"
                                            name="image"
                                            type="text"
                                            id="image"
                                            onChange={handleChange}
                                            value={eventFormState.image}
                                        />
                                    </div>
                                    <div className="flex-row space-between my-2">
                                        <label htmlFor="dateTime"></label>
                                        <div className="bg-red-800 opacity-80 rounded-xl p-3 w-80">
                                            <Calendar onClickDay={setDate} minDate={new Date()} value={date} />
                                            <div className='text-center fw-bold'>Selected Date:{' '}{date.toDateString()}</div>
                                        </div>
                                        {/* <input
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Choose a date for your event"
                                            name="dateTime"
                                            type="text"
                                            id="dateTime"
                                            onChange={handleChange}
                                            value={eventFormState.date}
                                        /> */}
                                    </div>
                                    <div className="flex-row space-between my-2">
                                        <textarea
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Enter a short description of your event"
                                            name="description"
                                            onChange={handleChange}
                                            value={eventFormState.description}
                                        ></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={(event) => {
                                                handleFormSubmit(event);
                                                setShowModal(false);
                                            }}
                                            type="submit"
                                            className="bg-red-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-red-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        >Submit</button>{" "}
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                    

                </div>
            }


            {/* Edit Club Modal */}
            {showEditModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-2 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-black">
                                        Update Club
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form
                                        onSubmit={handleEditClub}
                                    >
                                        <div className="flex-row space-between my-2">
                                            <label htmlFor="title"></label>
                                            <input
                                                className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                                placeholder="Title"
                                                name="title"
                                                type="text"
                                                id="title"
                                                onChange={handleEditClubChange}
                                                value={clubEditform.title}
                                            />
                                        </div>
                                        <div className="flex-row space-between my-2">
                                            <label htmlFor="maxMembers" className="text-black">Max. number of members:</label>
                                            <input
                                                className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                                placeholder="Max number of members"
                                                name="maxMembers"
                                                type="integer"
                                                id="maxMembers"
                                                onChange={handleEditClubChange}
                                                value={clubEditform.maxMembers}
                                            />
                                        </div>
                                        <div className="flex-row space-between my-2">
                                            <label htmlFor="price" className="text-black">Price:</label>
                                            <input
                                                className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                                placeholder="Price"
                                                name="price"
                                                type="float"
                                                id="price"
                                                onChange={handleEditClubChange}
                                                value={clubEditform.price}
                                            />
                                        </div>
                                        <div className="flex-row space-between my-2">
                                            <label htmlFor="price" className="text-black">Description:</label>
                                            <textarea
                                                className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                                placeholder="Short description of your club"
                                                name="description"
                                                type="float"
                                                onChange={handleEditClubChange}
                                                value={clubEditform.description}
                                            ></textarea>
                                        </div>
                                        <label htmlFor="image" className="text-black">Image:</label>
                                        <input
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Image link"
                                            name="image"
                                            type="text"
                                            id="image"
                                            onChange={handleEditClubChange}
                                            value={clubEditform.image}
                                        />
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={() => {
                                            handleEditClub()
                                            setShowEditModal(false)
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}





        </div>
    )
}


export default ClubDetail;
