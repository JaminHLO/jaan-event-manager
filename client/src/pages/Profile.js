import React from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ClubList from '../components/ClubList';
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
        <div>
        <div className="flex-row justify-center mb-3">
            <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing {user ? `${user.name}'s` : 'your'} profile.
            </h2>
           
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/profile/update`}
            >
              Update your Profile
            </Link>
           
            <div className="col-12 col-md-10 mb-5">
                <ClubList
                    clubs={user.myClubs}
                />
            </div>
           
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/clubs`}
            >
              Join a Club
            </Link>
           
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/newclub`}
            >
              Create a Club
            </Link>


            </div>
        </div>
    );
};


export default Profile;
