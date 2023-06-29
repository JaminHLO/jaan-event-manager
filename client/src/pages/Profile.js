import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ClubList from '../components/ClubList';

import Auth from '../utils/auth';

const Profile = () => {
    // const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};
    console.log(user)
    console.log(user.myClubs)
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/profile" />;
//   }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token)

    if (!token) {
      return false;
    }

    if (loading) {
        return <div>Loading...</div>;
    }


//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this. Use the navigation links above to
//         sign up or log in!
//       </h4>
//     );
//   }

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
                // title={`${user.username}'s thoughts...`}
                // showTitle={false}
                // showUsername={false} 
            />
            </div>
            {/* {!userParam && ( */}
            {/* // <div */}
            {/* //     className="col-12 col-md-10 mb-3 p-3"
            //     style={{ border: '1px dotted #1a1a1a' }}
            // >
            //     <ThoughtForm />
            // </div>
            // )} */}
        </div>
        </div>
    );
};

export default Profile;
