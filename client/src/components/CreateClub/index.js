import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { CREATE_CLUB, UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME, QUERY_CATEGORIES } from '../../utils/queries';
import { getGeocode } from '../../utils/helpers';


const CreateClub = (props) => {
    const { loading, data } = useQuery(QUERY_ME)
    const [createClub, { error }] = useMutation(CREATE_CLUB, {
        refetchQueries: [
            {
                query: QUERY_ME
            }
        ]
    });
    // const [updateUser, { error2 }] = useMutation(UPDATE_USER);

    const [success, setMessage] = React.useState(false);

    const userData = data?.me || {}
    console.log(userData)

    const { loading: loadingCats, data: dataCat } = useQuery(QUERY_CATEGORIES);
    const categoryData = dataCat?.categories || {}
    console.log('categories', categoryData)

    const [optionCat, setOptionCat] = useState("");
    const handleCat = (e) => {
        console.log(e.target.value);
        setOptionCat(e.target.value);
    };

    const [club, setClub] = useState({
        title: "",
        description: "",
        maxMembers: null,
        image: "",
        zipCode: null,
        price: null
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setClub({
            ...club,
            [name]: value,
        })
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // console.log(token)
    if (!token) {
        return false;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log("inside handleFormSubmit")
        // console.log(club)
        console.log("club is", club);
        console.log("cat", optionCat)
        console.log("adminId", userData._id)
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
            console.log('-------', club, userData._id, optionCat)
            const { data } =
                await createClub({
                    variables: {
                        club: {
                            adminId: userData._id,
                            title: club.title.toString(),
                            description: club.description.toString(),
                            maxMembers: parseInt(club.maxMembers),
                            image: club.image.toString(),
                            price: parseFloat(club.price),
                            category: optionCat,
                            geocode: geoJSONString,
                            zipCode: parseInt(club.zipCode),
                        }
                    },
                });
            console.log("createClub data is")
            console.log(data)
            setClub({
                title: "",
                description: "",
                maxMembers: 1,
                image: "",
                zipCode: 0,
                price: 0
            })
            setOptionCat('')
            if (data) {
                setMessage(true)
            }
        } catch (error) {
            console.error(error)
        }
    };


    if (loading || loadingCats) {
        return <div>Loading...</div>;
    }

    return (
        <div className="create-club my-1  flex justify-center items-center min-h-[90vh]">
            <div className='p-5 bg-black opacity-80 w-1/2 h-auto rounded-2xl text-center transition ease-in-out delay-150 hover:opacity-90'>
                <h2 className='text-white text-3xl m-3'>Create a Club</h2>
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
                    Successfully created Club!
                    <br></br>
                    <Link to="/profile" >← Back to Profile</Link>
                </h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="description" className='text-white'>Category:</label>
                        <select className="flex-row space-between my-2 rounded-2xl m-2"
                            id="Category"
                            onChange={handleCat}
                            value={club.category}
                        >
                            <option selected="true" disabled="disabled">Select Category</option>
                            {categoryData?.map((cat) => (
                                <option className='rounded-2xl m-3 w-72' value={cat._id}
                                >{cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="title" className='text-white'></label><br />
                        <input
                            className='login-input rounded-2xl m-1 w-72'
                            placeholder="Club Name"
                            name="title"
                            type="title"
                            id="title"
                            maxlength="24"
                            onChange={handleChange}
                            value={club.title}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="description" className='text-white'></label><br />
                        <input
                            className='login-input rounded-2xl m-1 w-72'
                            placeholder="Description"
                            name="description"
                            type="description"
                            id="description"
                            onChange={handleChange}
                            value={club.description}
                        />
                    </div>

                    <div className="flex-row space-between my-2">
                        <label htmlFor="maxMembers" className='text-white'></label><br />
                        <input
                            className='login-input rounded-2xl m-1 w-72'
                            placeholder="Maximum Members"
                            name="maxMembers"
                            type="text"
                            id="maxMembers"
                            inputMode="numeric"
                            onChange={handleChange}
                            value={club.maxMembers}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="img" className='text-white'></label><br />
                        <input
                            className='login-input rounded-2xl m-1 w-72'
                            placeholder="Image link"
                            name="image"
                            type="text"
                            id="image"
                            onChange={handleChange}
                            value={club.image}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="zipCode" className='text-white'></label><br />
                        <input
                            className='login-input rounded-2xl m-1 w-72'
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
                        <label htmlFor="price" className='text-white'></label><br />
                        <input
                            className='login-input rounded-2xl m-1 w-72'
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
                            className=" m-3 transition ease-in-out delay-150 bg-red-900 cursor-pointer hover:bg-rose-950 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateClub;