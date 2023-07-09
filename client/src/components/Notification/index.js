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
            <h2>Notice:</h2>
            {clubData.notifications?._id ? (
                <div>
                    <p>{clubData.notifications.message}</p>
                    {isAdmin && <button onClick={handleRemove}>Remove Notification</button>}
                </div>

            ) : (
                <div>
                    {isAdmin && <button onClick={() => setShowModal(true)}>Create Notification</button>}
                </div>
            )}
            {showModal ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="notificationMsg">Create a new club notification</label>
                        <input
                            className="text-black"
                            type="text"
                            placeholder="Enter a short message"
                            onChange={(event) => setNotificationMsg(event.target.value)}
                            name="notificationMsg"
                            value={notificationMsg}
                        ></input>
                        <button type="submit" onClick={(event) => {
                            handleSubmit(event)
                            setShowModal(false)
                        }}>Submit</button>{" "}
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default Notification;