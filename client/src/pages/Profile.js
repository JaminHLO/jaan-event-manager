import React from 'react';
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
                <h2 className="text-white col-span-9 h-[3.75rem] bg-dark text-light p-3 text-4xl flex flex-row justify-center">
                    {/* Viewing {user ? `${user.name}'s` : 'your'} profile. */}
                    Hello {`${user.name}`} <img className="h-16 ml-3" src={sportsIcon}></img>
                </h2>
            </div>

            <div className='flex flex-row mt-10'>
                <div className="bg-black bg-opacity-60 w-1/4 rounded-2xl h-[40rem] ml-20">
                    <div className='flex justify-center flex-col items-center p-3'>
                        <div className="relative w-10/12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            {!user.image ? (
                                <img src='./images/profile.png' className="w-30 h-30" />
                            ) : (
                                <img src={user.image} />
                            )}
                        </div>
                        <div className='flex justify-center m-4'>
                            <ul>
                                <li className='m-3'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/profile/update`}
                                        >
                                            Update your Profile

                                        </Link>
                                    </button>
                                </li>
                                <li className='m-3'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/clubs`}
                                        >
                                            Join a Club
                                        </Link>
                                    </button>
                                </li>
                                <li className='m-3'>
                                    <button className='w-48 bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl'>
                                        <Link
                                            className="btn btn-primary btn-block btn-squared"
                                            to={`/events`}
                                        >
                                            Search for Events
                                        </Link>
                                    </button>
                                </li>
                                <li className='m-3'>
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
                    <div className="overflow-auto mb-4 club-event-profile text-white bg-black bg-opacity-60 rounded-xl h-[48.5%]">
                        <p className='text-3xl text-center'>Your Clubs</p>
                        <div className='flex justify-center flex-col items-center mt-20'>
                            <ClubList
                                clubs={user.myClubs}
                            />
                            <img src={sadFace}></img>
                        </div>
                    </div>

                    <div className="overflow-auto mt-4 club-event-profile text-white bg-black bg-opacity-60 rounded-xl h-[48.5%]">
                        <p className='text-3xl text-center'>Your Events</p>
                        <div className='flex justify-center flex-col items-center mt-20'>
                            <EventList
                                events={user.myEvents}
                            />
                            <img src={sadFace}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Profile;
