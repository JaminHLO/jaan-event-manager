import React from 'react';
import { Link } from 'react-router-dom';

const ClubList = ({ clubs }) => {
  if (!clubs.length) {
    return <h3>No Clubs yet</h3>;
  }

  return (
    <div>
      <h3>My Clubs</h3>
        {clubs &&
        clubs.map((club) => (
          <div key={club.title} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {club.title} <br/>
              {club.description}
              {club.address}
            </h4>
              <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/clubs/club/${club._id}`}
              >
              More detail...
            </Link>
          </div>
        ))}
    </div>
  );
};


export default ClubList;