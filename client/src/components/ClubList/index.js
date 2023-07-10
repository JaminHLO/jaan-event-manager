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
          <div key={club._id} className="border-solid border-2 rounded-xl flex items-center flex-wrap m-3 p-3">
            {!club.image ? (
              <img className="h-32 w-32 rounded-2xl my-1"
                src='./images/club_default.jpg' />
            ) : (
              <img className="h-32 w-32 rounded-2xl my-1"
                src={club.image} />
            )}
            <div className="m-5">
              <div className='font-bold text-xl'>
                {club.title}
                <p className='text-white text-base'>
                  {club.description}
                </p>
                <div className="mt-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Link
                      to={`/clubs/club/${club._id}`}
                    >
                      More...
                    </Link>
                  </span>
                </div>
              </div>

              <ul>
                <li>{club.address}</li>
                <li>{club.dateTime}</li>
              </ul>

            </div>
          </div>
        ))}
    </div>
  );
};


export default ClubList;