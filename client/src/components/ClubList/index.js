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
              {/* <span style={{ fontSize: '1rem' }}>
                had this thought on {thought.createdAt}
              </span> */}
            </h4>
            {/* <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            > */}
              {/* Join the discussion on this thought.
            </Link> */}
          </div>
        ))}
    </div>
  );
};

export default ClubList;
