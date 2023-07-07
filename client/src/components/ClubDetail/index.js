import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_CLUB, QUERY_ME, QUERY_CHECKOUT } from "../../utils/queries";
import { ADD_EVENT } from "../../utils/mutations";
import Cart from "../Cart";
import auth from "../../utils/auth";
import JaanMap from "../JaanMap";
import { idbPromise, getGeocode } from "../../utils/helpers";

const stripePromise = loadStripe(
    'pk_test_51NNi4mBTDevFCiGQvy6JTMqQQ8UpkUSfhPkbq9VlNb5f0zKttPUMO2EKirlmPST1ttc8JlggwW8AAaO2S1yz8uiG00nN0DWcxK');

const ClubDetail = () => {
    const { id: clubIdParam } = useParams();

    const [showModal, setShowModal] = useState(false);
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

    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);

    const userData = meData?.me || {};

    // console.log('userData is', userData)
    // console.log('clubData is', clubData);
    const latLngArray = [];
    if (userData?.geocode) latLngArray.push(JSON.parse(userData.geocode));
    if (clubData?.geocode) latLngArray.push(JSON.parse(clubData.geocode));

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

    if (loading || meLoading) {
        return <div>Loading...</div>
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEventFormState({
            ...eventFormState,
            [name]: value,
        })
    }

    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
        return false;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const geoEventAddress = await getGeocode(eventFormState.address);
            const geoEventAddressString = JSON.stringify(geoEventAddress);
            console.log("geoEventAddress is:", geoEventAddressString);
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
                        geocode: geoEventAddress
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

    return (

        <div className="profile text-white flex justify-center items-center">
            <div className="transition ease-in-out delay-150 bg-black opacity-60 hover:opacity-70 max-w-[25rem] rounded-2xl h-[30rem] mr-[5rem]">
                <div className="p-4">
                    <JaanMap latLngArray={latLngArray} />
                </div>
                <div className="text-center">
                    {auth.loggedIn() && isAdmin ? (
                        <button
                            className="mb-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => { setShowModal(true) }}
                        >Create an event</button>
                    ) : null}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-auto resize-y flex transition ease-in-out delay-150 bg-black opacity-60 hover:opacity-70 rounded-2xl w-[60rem] h-[18rem] mb-4">
                    <div>
                        <img className="h-[100%] w-[100%] rounded-2xl" src={clubData.image}></img>
                    </div>
                    <div className="ml-10 m-5">
                        <h3 className="text-3xl m-2">{clubData.title}</h3>

                        <p className="text-xl m-2">About: {clubData.description}</p>
                        <p className="text-xl m-2">Membership Price: ${clubData.price}</p>
                        <p className="text-xl m-2">Spots Available: {clubData.spotsAvailable}</p>
                        <button className="transition ease-in-out delay-150 bg-red-900 cursor-pointer rounded-xl p-2 m-3 hover:bg-rose-950" onClick={submitCheckout}>Purchase Membership</button>
                    </div>
                </div>
                <div className="overflow-auto resize-y transition ease-in-out delay-150 bg-black opacity-60 hover:opacity-70 rounded-2xl w-[60rem] h-[18rem] mt-4">
                    <h2 className="text-3xl text-center m-4">List of Events</h2>
                    <ul>
                        {clubData.events?.length !== 0 ? (

                            clubEvents.map((singleEvent) => (
                                <li>
                                    <Link to={`/events/event/${singleEvent._id}`}>
                                        {singleEvent.title}
                                        {singleEvent.dateTime}
                                    </Link>
                                </li>
                            ))) : (
                            <p>No events have been listed for this club</p>
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
                                        <label htmlFor="dateTime"></label>
                                        <input
                                            className="modal-input bg-red-800 opacity-80 rounded-xl p-3 w-80"
                                            placeholder="Choose a date for your event"
                                            name="dateTime"
                                            type="text"
                                            id="dateTime"
                                            onChange={handleChange}
                                            value={eventFormState.date}
                                        />
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
        </div>
    )
}

export default ClubDetail;