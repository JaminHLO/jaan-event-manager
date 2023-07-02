import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { CREATE_CLUB, UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { getGeocode } from '../../utils/helpers';


const CreateClub = (props) => {
    const { loading, data } = useQuery(QUERY_ME)
    const [createClub, { error }] = useMutation(CREATE_CLUB);
    const [updateUser, { error2 }] = useMutation(UPDATE_USER);

    const userData = data?.me || {}
    // console.log(userData)
  

    const [club, setClub] = useState({  
        title: "",
        description: "",
        category: "",
        maxMembers: 1,
        image: "",
        zipCode: 0,
        price: 0
    });

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // console.log(token)
    if (!token) {
      return false;
    }  

    const handleChange = (event) => {
        let { name, value } = event.target;
        console.log(`clicked name is: ${name}`)
        switch (name) {
            case 'title': 
            case 'description':
            case 'image':
                value = value.toString();
                break;
            case 'maxMembers':
            case 'zipCode':
                if (value !== '') {
                    value=  parseInt(value);
                } 
                break;
            case 'price':
                if (value !== '') {
                    value = parseFloat(value);
                }
                break;
            default:
                break;
        }
        setClub(club => ({
          ...club,
          [name]: value
        }));
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log("inside handleFormSubmit")
        // console.log(club)
    
        let geoJSONString = ""

        try {
            if (club.zipCode){
                const zipCodeString = club.zipCode.toString()
                const googleGeocode = await getGeocode(zipCodeString);
                // .then((googleGeocode) => {
                // console.log("googleGeocode is:", googleGeocode);
                geoJSONString = JSON.stringify(googleGeocode);
                // console.log("geoJSONString is:", geoJSONString);

                // setClub((club) => ({
                //     ...club, 
                //     geocode: geoJSONString
                // }));
                // });
            }
            // console.log("club is", club);
        //   const { data } = 
            await createClub({
                variables: {
                    title: club.title,
                    description: club.description,
                    maxMembers: club.maxMembers,
                    image: club.image,
                    price: club.price,
                    // // category: club.category,
                    geocode: geoJSONString,
                    zipCode: club.zipCode,
            },
        });
        //   console.log("createClub data is")
        //   console.log(data)

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
                value={club.title}
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
                value={club.description}
            />
            </div>
            {/* <div className="flex-row space-between my-2">
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" type="category">
                <option > --Please Select--</option>
                <option value={club.category}>Soccer</option>
                <option value={club.category}>Football</option>
                <option value={club.category}>Basketball</option>
                <option value={club.category}>Baseball</option>
                <option value={club.category}>Gymnastics</option>
                <option value={club.category}>Cardio</option>
                <option value={club.category}>Yoga</option>
                <option value={club.category}>Swimming</option>
                <option value={club.category}>Weight Lifting</option>
                <option value={club.category}>Tennis</option>
                <option value={club.category}>Cycling</option>
                <option value={club.category}>Martial Arts</option>
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
                value={club.maxMembers}
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
                value={club.image}
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
                value={club.zipCode}
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
                value={club.price}
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