// Project-3 Cmplete your profile
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const UpdateProfile = (props) => {
  const { loading, data } = useQuery(QUERY_ME)
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const [showModal, setShowModal] = React.useState(false);

  const userData = data?.me || {}
  // console.log(userData)
  const participants = userData.participants
  // const [formState, setFormState] = useState({ name: "", image: "", address: "" });
  const [formState, setFormState] = useState({ name: `${userData?.name}`, image: ``, address: `${userData?.address}`, participants: `${userData?.participants}` });

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  // console.log(token)
  if (!token) {
    return false;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState)
    console.log("click")

    try {
      const { data } = await updateUser({
        variables: {
          user: { ...formState }
        },
      });
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="container my-1">
      <Link to="/profile">← Back to Profile</Link>

      <h2>Update your Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="Name">Name:</label>
          <input
            placeholder="Name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
            value={formState.name}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="img">Image:</label>
          <input
            placeholder="image"
            name="image"
            type="file"
            id="image"
            // accept="image/*"
            onChange={handleChange}
            value={formState.image}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="address">Address:</label>
          <input
            placeholder="address"
            name="address"
            type="address"
            id="address"
            onChange={handleChange}
            value={formState.address}
          />
        </div>
        <label htmlFor="participants">Participants:</label>
        {
        participants?.map((participant) => (
          <div className="flex-row space-between my-2">
          <input
            placeholder="name"
            name="name"
            type="name"
            // id="name"
            // onChange={handleChange}            
            value={(participant)}
          />
        </div>
        ))}
        {/* <Link to="/profile/update/participants">Add Participants</Link> */}
        
        <button
        className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add participant
      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add a participant
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
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
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
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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


        <div className="flex-row flex-end">
          <button
            type="submit"
          >Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
