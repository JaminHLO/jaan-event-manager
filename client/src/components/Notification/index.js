import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from "../../utils/mutations";

const Notification = ({ clubData, userData }) => {

    const [notificationMsg, setNotificationMsg] = useState("");
    const [addNotification] = useMutation(CREATE_NOTIFICATIONS);
    const [removeNotification] = useMutation(REMOVE_NOTIFICATIONS);
    const [showModal, setShowModal] = useState(false);

    let isAdmin = false;

    if (clubData.adminId === userData._id) {
        isAdmin = true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addNotification({
                variables: {
                    message: notificationMsg,
                    clubId: clubData._id,
                }
            })
            setNotificationMsg("")
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemove = async () => {
        console.log("clicked remove")
        try {
            await removeNotification({
                variables: {
                    clubId: clubData._id
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            {clubData.notifications?._id ? (
                <div>
                    {/* <h2 className="text-2xl m-2 text-red-500">Notice:</h2> */}
                    {/* <p className="text-xl ml-2 text-red-500">Announcement:</p> */}
                    <div className="text-xl ml-2 text-red-500">Notice: "{clubData.notifications.message}"
                        {isAdmin && <button className="m-2 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={handleRemove}>Delete</button>}
                    </div>

                </div>

            ) : (
                <div>
                    {/* {isAdmin && <button onClick={() => setShowModal(true)}>Create Notification</button>} */}
                    {isAdmin && <button className="mb-1 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 xs:mr-3 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setShowModal(true)}
                    >Post announcement</button>}
                </div>
            )}
            {showModal ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* <label htmlFor="notificationMsg">Create a new club notification</label> */}
                        <input
                            className="text-black"
                            type="text"
                            size="40"
                            placeholder="Enter Announcement"
                            onChange={(event) => setNotificationMsg(event.target.value)}
                            name="notificationMsg"
                            value={notificationMsg}
                        ></input>
                        <button className="m-2 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit" onClick={(event) => {
                                handleSubmit(event)
                                setShowModal(false)
                            }}>Submit</button>{" "}

                        <button className="m-2 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => setShowModal(false)}>Close</button>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default Notification;