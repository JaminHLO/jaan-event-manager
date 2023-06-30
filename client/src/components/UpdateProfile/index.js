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

  const userData = data?.me || {}
  // console.log(userData)

  const [formState, setFormState] = useState({ name: "", image: "", address: "" });
  // const [formState, setFormState] = useState({ name: `${userData?.name}`, image: `${userData?.image}`, address: `${userData?.address}` });

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
            // type="file"
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
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="********"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}            
            value={formState.password}
          />
        </div> */}
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
