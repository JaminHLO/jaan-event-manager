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
    // const [updateUser, { error2 }] = useMutation(UPDATE_USER);

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
                    value = parseInt(value);
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
            if (club.zipCode) {
                const zipCodeString = club.zipCode.toString()
                geoJSONString = await getGeocode(zipCodeString);
                // .then((googleGeocode) => {
                // console.log("googleGeocode is:", googleGeocode);
                // geoJSONString = JSON.stringify(googleGeocode);
                // console.log("geoJSONString is:", geoJSONString);

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
        <div className="profile my-1  flex justify-center items-center min-h-[90vh]">
            <div className='p-5 bg-black opacity-50 w-1/2 h-auto rounded-2xl text-center transition ease-in-out delay-150 bg-black opacity-50 hover:opacity-70'>
                <h2 className='text-white text-3xl m-3'>Create a Club</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="title" className='text-white'></label>
                        <input
                            className='login-input rounded-2xl m-3 w-72'
                            placeholder="Club Name"
                            name="title"
                            type="title"
                            id="title"
                            onChange={handleChange}
                            value={club.title}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="description" className='text-white'></label>
                        <input
                            className='login-input rounded-2xl m-3 w-72'
                            placeholder="Description"
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
                        <label htmlFor="maxMembers" className='text-white'></label>
                        <input
                            className='login-input rounded-2xl m-3 w-72'
                            placeholder="Maximum Members"
                            name="maxMembers"
                            type="text"
                            id="maxMembers"
                            inputMode="numeric"
                            // accept="image/*"
                            onChange={handleChange}
                            value={club.maxMembers}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="img" className='text-white'></label>
                        <input
                            className='login-input rounded-2xl m-3 w-72'
                            placeholder="Image"
                            name="image"
                            // type="file"
                            id="image"
                            // accept="image/*"
                            onChange={handleChange}
                            value={club.image}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="zipCode" className='text-white'></label>
                        <input
                            className='login-input rounded-2xl m-3 w-72'
                            placeholder="Zip Code"
                            name="zipCode"
                            type="text"
                            inputMode="numeric"
                            max="99999"
                            id="zipCode"
                            onChange={handleChange}
                            value={club.zipCode}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="price" className='text-white'></label>
                        <input
                            className='login-input rounded-2xl m-3 w-72'
                            placeholder="Price to Join"
                            name="price"
                            type="price"
                            id="price"
                            onChange={handleChange}
                            value={club.price}
                        />
                    </div>
                    <div className="flex-row flex-end">
                        <button
                            className="mb-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                        >Submit
                        </button>
                        <br></br>
                        <Link to="/profile" className='text-white'>← Back to Profile</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateClub;