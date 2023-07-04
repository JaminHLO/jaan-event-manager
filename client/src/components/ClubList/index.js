import React from 'react';
import { Link } from 'react-router-dom';

const ClubList = ({ clubs }) => {
  if (!clubs?.length) {
    return <h3>No Clubs yet</h3>;
  }

  return (
    <div>
        {clubs &&
        clubs.map((club) => (
          <div key={club._id} className="max-w-sm rounded overflow-hidden shadow-lg">
            { !club.image ? (
                <img className="w-full" 
                src= './images/club_default.jpg' />
              ) : (
                <img className="w-full" 
                src= {club.image} />
              )}
            <div className="px-6 py-4">
                <div className='font-bold text-xl mb-2'>
                 {club.title} 
                </div>
                <p className='text-gray-700 text-base'>
                    {club.description}
                </p>
                <ul>
                    <li>{club.address}</li>
                    <li>{club.dateTime}</li>
                </ul>
                
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Link
                    to={`/clubs/club/${club._id}`}
                    >
                    More...
                    </Link>
                </span>
            </div>
          </div>
        ))}
    </div>
  );
};


export default ClubList;