import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from "../../utils/mutations";

const Notification = ({ clubData }) => {

    const [notificationMsg, setNotificationMsg] = useState("");
    const [addNotification, { error }] = useMutation(CREATE_NOTIFICATIONS)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addNotification({
                variables: {
                    message: notificationMsg,
                    clubId: clubData._id,
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>THIS IS YOUR NOTIFICATION</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Create a new club notification</label>
                    <input
                        type="text"
                        placeholder="Enter a short message"
                        onChange={(event) => setNotificationMsg(event.target.value)}
                        name="notificationMsg"
                        value={notificationMsg}
                    ></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Notification;