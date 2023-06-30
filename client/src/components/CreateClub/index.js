import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { CREATE_CLUB } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';


const CreateClub = (props) => {
    const { loading, data } = useQuery(QUERY_ME)
    const [createClub, { error }] = useMutation(CREATE_CLUB);

    const userData = data?.me || {}
    // console.log(userData)
  

    const [formState, setFormState] = useState({  
        title: '',
        description: '',
        // category: '',
        maxMembers: '',
        image: '',
        zipCode: '',
        price: ''
    });

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
        console.log("inside handleFormSubmit")
        console.log(formState)
    
        try {
          const { data } = await createClub({ //
            variables: {
              club: { ...formState }
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

        <h2>Create a Club</h2>
        <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
            <label htmlFor="title">Club Name:</label>
            <input
                placeholder=" enter club name"
                name="title"
                type="title"
                id="title"
                onChange={handleChange}
                value={formState.title}
            />
            </div>
            <div className="flex-row space-between my-2">
            <label htmlFor="description">Description:</label>
            <input
                placeholder=" enter description"
                name="description"
                type="description"
                id="description"
                onChange={handleChange}
                value={formState.description}
            />
            </div>
            {/* <div className="flex-row space-between my-2">
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" type="category">
                <option > --Please Select--</option>
                <option value={formState.category}>Soccer</option>
                <option value={formState.category}>Football</option>
                <option value={formState.category}>Basketball</option>
                <option value={formState.category}>Baseball</option>
                <option value={formState.category}>Gymnastics</option>
                <option value={formState.category}>Cardio</option>
                <option value={formState.category}>Yoga</option>
                <option value={formState.category}>Swimming</option>
                <option value={formState.category}>Weight Lifting</option>
                <option value={formState.category}>Tennis</option>
                <option value={formState.category}>Cycling</option>
                <option value={formState.category}>Martial Arts</option>
            </select>
            </div> */}
            <div className="flex-row space-between my-2">
            <label htmlFor="maxMembers">Maximum Members:</label>
            <input
                placeholder=" enter maxMembers"
                name="maxMembers"
                type="number"
                id="maxMembers"
                // accept="image/*"
                onChange={handleChange}
                value={formState.maxMembers}
            />
            </div>
            <div className="flex-row space-between my-2">
            <label htmlFor="img">Image:</label>
            <input
                placeholder=" enter image"
                name="image"
                // type="file"
                id="image"
                // accept="image/*"
                onChange={handleChange}
                value={formState.image}
            />
            </div>
            <div className="flex-row space-between my-2">
            <label htmlFor="zipCode">Zip Code:</label>
            <input
                placeholder=" enter zipCode"
                name="zipCode"
                type="number"
                max="99999"
                id="zipCode"
                onChange={handleChange}
                value={formState.zipCode}
            />
            </div>
            <div className="flex-row space-between my-2">
            <label htmlFor="price">Price to Join:</label>
            <input
                placeholder=" enter price"
                name="price"
                type="price"
                id="price"
                onChange={handleChange}
                value={formState.price}
            />
            </div>
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

export default CreateClub;