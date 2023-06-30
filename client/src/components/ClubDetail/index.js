import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CLUB, QUERY_ME } from "../../utils/queries";
import { ADD_EVENT } from "../../utils/mutations";
import auth from "../../utils/auth";

const ClubDetail = () => {
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const [eventFormState, setEventFormState] = useState(
        {
            title: "",
            address: "",
            date: "",
            description: "",
        })


    const { id: clubId } = useParams();
    const { loading, data } = useQuery(QUERY_CLUB, {
        variables: { id: clubId }
    });

    const clubData = data?.club || {};

    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);

    const userData = meData?.me || {};

    useEffect(() => {
        if (userData._id === clubData.adminId) {
            setIsAdmin(true)
        }
    }, [])

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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addEvent({
                variables: {
                    clubId: clubData._id,
                    event: { ...eventFormState }
                }
            })
        } catch (error) {
            console.error(error)
        }
    };



    return (
        <div>
            <h3>{clubData.title}</h3>
            <p>{clubData.description}</p>
            {auth.loggedIn() && isAdmin ? (
                <button
                    onClick={() => { setShowModal(true) }}
                >Create an event</button>
            ) : null}

            {showModal &&
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex-row space-between my-2">
                            <label htmlFor="title">Title:</label>
                            <input
                                placeholder="A title for your event"
                                name="title"
                                type="text"
                                id="title"
                                onChange={handleChange}
                                value={eventFormState.title}
                            />
                        </div>
                        <div className="flex-row space-between my-2">
                            <label htmlFor="address">Location:</label>
                            <input
                                placeholder="Where is this event taking place?"
                                name="address"
                                type="text"
                                id="address"
                                onChange={handleChange}
                                value={eventFormState.address}
                            />
                        </div>
                        <div className="flex-row space-between my-2">
                            <label htmlFor="date">Date:</label>
                            <input
                                placeholder="Choose a date for your event"
                                name="date"
                                type="text"
                                id="date"
                                onChange={handleChange}
                                value={eventFormState.date}
                            />
                        </div>
                        <div className="flex-row space-between my-2">
                            <textarea
                                placeholder="Enter a short description of your event"
                                name="description"
                                onChange={handleChange}
                                value={eventFormState.description}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    handleFormSubmit();
                                    setShowModal(false);
                                }}
                            >Submit</button>
                            <button
                                onClick={() => { setShowModal(false) }}
                            >Exit</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default ClubDetail;