import React from 'react';
import { Link } from 'react-router-dom';
import sadIcon from '../../images/sad-face-icon.png';

const ClubList = ({ clubs }) => {
  if (!clubs?.length) {
    return (
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h3 className="text-xl">No Clubs yet</h3>
        <img src={sadIcon}></img>
      </div>
    )
  }

  return (
    <div className='w-[40rem]'>
      {clubs &&
        clubs.map((club) => (
          <div key={club._id} className="border-solid border-2 rounded-xl flex flex-col items-center flex-wrap m-3 p-3">
            {!club.image ? (
              <img className="h-48 w-48 rounded-2xl"
                src='./images/club_default.jpg' />
            ) : (
              <img className="h-48 w-48 rounded-2xl"
                src={club.image} />
            )}
            <div className="">
              <div className='font-bold text-xl'>
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
            <div className="">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <Link
                  to={`/clubs/club/${club._id}`}
                >
                  More Info...
                </Link>
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};


export default ClubList;