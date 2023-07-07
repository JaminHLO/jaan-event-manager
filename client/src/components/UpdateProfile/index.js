import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { getGeocode } from '../../utils/helpers'; 
 

const UpdateProfile = (props) => {
  const { loading, data } = useQuery(QUERY_ME)
  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    refetchQueries : [
      {
        query: QUERY_ME
      }
    ]
  })

  const [showModal, setShowModal] = React.useState(false);
  const [success, setMessage] = React.useState(false);

  const userData = data?.me || {}
  const participants = userData.participants
  // Populate form with current user data
  const [formState, setFormState] = useState({ name: `${userData?.name}`, address: `${userData?.address}`, image: `${userData?.image}`, geocode: ``});
  const [newParticipant, setNewParticipant] = useState('')


  const token = Auth.loggedIn() ? Auth.getToken() : null;
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

  const handleParticipantChange = (event) => {
    const { name, value } = event.target;
    setNewParticipant({
      ...newParticipant,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const value = await getGeocode(formState.address);
      console.log("value is", value)

        setFormState({
          ...formState,
          geocode: value,
        });
        
        console.log('formState.geocode is', formState.geocode);
        const { data } = await updateUser({
          variables: {
            user: { ...formState, geocode: value
             }
        }});
        if(data) {
          setMessage(true)
        }

    } catch (error) {
      console.error(error)
    }
  };

  const handleParticipantSubmit = async () => {
    console.log("new name", newParticipant)
    const newParticipantArray = [...participants, newParticipant.newParticipantName]
    try {
      const { data } = await updateUser({
        variables: {
          user: {
            participants: newParticipantArray
          }
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="profile my-1  flex justify-center items-center min-h-[90vh]">
      <div className='p-5 bg-black opacity-50 w-1/2 h-auto rounded-2xl text-center transition ease-in-out delay-150 bg-black opacity-50 hover:opacity-70'>
        <h2 className='text-white text-3xl text-center'>Update your Profile</h2>
        <h3
          style={
            success
              ? {
                  display: "block",
                  backgroundColor: "#5ced73",
                  textAlign: "center",
                  fontWeight: "lighter",
                  borderRadius: "5px",
                }
              : { display: "none" }
          }
        >
        Successfully updated account information!
        <br></br>
        <Link to="/profile" >← Back to Profile</Link>
      </h3>
        <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="img" className='text-white'>Image:</label> */}
            <input
              className='login-input rounded-2xl m-3 w-72'
              placeholder="image link"
              name="image"
              type="text"
              id="image"
              onChange={handleChange}
              value={formState.image}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="Name" className='text-white'></label>
            <input
              className='login-input rounded-2xl m-3 w-72'
              placeholder="Name"
              name="name"
              type="name"
              id="name"
              onChange={handleChange}
              value={formState.name}
            />
          </div>

          <div className="flex-row space-between my-2">
            <label htmlFor="address" className='text-white'></label>
            <input
              className='login-input rounded-2xl m-3 w-72'
              placeholder="address"
              name="address"
              type="address"
              id="address"
              onChange={handleChange}
              value={formState.address}
            />
          </div>
          <label htmlFor="participants" className='text-white'>Participants:</label>
          {
            participants?.map((participant) => (
              <div className="flex-row space-between my-2">
                <input readOnly
                  value={(participant)}
                />
              </div>
            ))}

{/* Modal to Add Participant */}
        <button
          className="mb-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add participant
        </button>
        <br></br>
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
                    <form onSubmit={handleParticipantSubmit}>
                      <div className="flex-row space-between my-2">
                        <label htmlFor="newParticipantName">New participant:</label>
                        <input
                          placeholder="Name"
                          name="newParticipantName"
                          type="name"
                          id="newParticipantName"
                          onChange={handleParticipantChange}
                          value={newParticipant.newParticipantName}
                        />
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
                        handleParticipantSubmit()
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

          <div className="flex-row flex-end">
            <button
              className="mb-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >Submit
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
}

export default UpdateProfile;
