import React from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ClubList from '../components/ClubList';
import EventList from '../components/EventList'
import Auth from '../utils/auth';


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
        <div className='grid grid-cols-12 gap-2 w-full h-full'>
            <h2 className="col-span-9 h-[3.75rem] bg-dark text-light p-3 mb-5">
                Viewing {user ? `${user.name}'s` : 'your'} profile.
            </h2>

            <div className='col-span-8 h-[calc(100vh-3.75rem)] p-4'>           
             
                <div className="col-12 col-md-10 mb-5">
                    <ClubList
                        clubs={user.myClubs}
                    />
                </div>
                
                <div className="col-12 col-md-10 mb-5">
                    <EventList
                        events={user.myEvents}
                    />
                </div>
            </div>
            <aside id="aside" className='col-span-3 p-4'>
                <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    { !user.image ? (
                    <img src='./images/profile.png' className="w-30 h-30"/>
                    ) : (
                    <img src={user.image} />   
                    )}
                </div>
                <ul>
                <li>
                    <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/profile/update`}
                    >
                        Update your Profile

                    </Link>
                </li>
                <li>
                    <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/clubs`}
                    >
                        Join a Club
                    </Link>
                </li>
                <li>
                    <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/events`}
                    >
                        Search for Events
                    </Link>
                </li>
                <li>
                    <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/clubs/create`}
                    >
                        Create a Club
                    </Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
};


export default Profile;
