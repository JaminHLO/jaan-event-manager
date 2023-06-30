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
    console.log(user)
    console.log('clubs', user.myClubs)
    console.log('events', user.myEvents)

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
                <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/profile/update`}
                >
                    Update your Profile
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>

                </Link>
                <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/clubs`}
                >
                    Join a Club
                </Link>
                
                <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/events`}
                >
                    Search for Events
                </Link>

                <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/newclub`}
                >
                    Create a Club
                </Link>

            </aside>
        </div>
    );
};


export default Profile;
