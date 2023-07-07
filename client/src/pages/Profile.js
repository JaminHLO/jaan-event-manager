import React, { useEffect } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ClubList from '../components/ClubList';
import EventList from '../components/EventList'
import Auth from '../utils/auth';
import sportsIcon from '../images/sports-icon.png';
import sadFace from '../images/sad-face-icon.png';


const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};
    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        if (!user?.address) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [user])

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.name) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }


    return (
        <div className='profile w-full h-full'>
            <div>
                <h2 className="profile-header text-white col-span-9 h-[3.75rem] bg-dark text-light p-6 text-4xl flex flex-row justify-center">
                    {/* Viewing {user ? `${user.name}'s` : 'your'} profile. */}
                    Hello {`${user.name}`}
                </h2>
            </div>

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
                                        Complete your profile
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
                                    <div className="flex-row space-between my-2">
                                        <p>Complete your profile for a better experience</p>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/profile/update`}
                                        >
                                            Update Profile
                                        </Link>
                                    </button>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            <div className='flex flex-row mt-10'>
                <div className="bg-black bg-opacity-60 max-w-[25rem] rounded-2xl h-[45rem] ml-20">
                    <div className='flex justify-center flex-col items-center p-3 h-full'>
                        <div className="relative w-10/12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 h-[50%]">
                            {!user.image ? (
                                <img src='./images/profile.png' className="h-full w-full profile-pic object-cover" />
                            ) : (
                                <img className="profile-pic h-full w-full object-cover" src={user.image} />
                            )}
                        </div>
                        <div className='flex justify-center items-center m-4 h-[50%]'>
                            <ul>
                                <li className='m-4'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/profile/update`}
                                        >
                                            Update your Profile

                                        </Link>
                                    </button>
                                </li>
                                <li className='m-4'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/clubs`}
                                        >
                                            Join a Club
                                        </Link>
                                    </button>
                                </li>
                                <li className='m-4'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/searchEvents`}
                                        >
                                            Search for Events
                                        </Link>
                                    </button>
                                </li>
                                <li className='m-4'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/clubs/create`}
                                        >
                                            Create a Club
                                        </Link>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='pl-10'>
                    <div className="overflow-auto resize-y mb-4 club-event-profile text-white bg-black bg-opacity-60 rounded-xl h-[48.5%] max-h-[30rem]">
                        <p className='text-3xl text-center m-3'>Your Clubs</p>
                        <div className='flex justify-center flex-col items-center'>
                            <ClubList
                                clubs={user.myClubs}
                            />
                        </div>
                    </div>

                    <div className="overflow-auto resize-y mt-4 club-event-profile text-white bg-black bg-opacity-60 rounded-xl h-[48.5%] max-h-[30rem]">
                        <p className='text-3xl text-center m-3'>Your Events</p>
                        <div className='flex justify-center flex-col items-center'>
                            <EventList
                                events={user.myEvents}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Profile;
