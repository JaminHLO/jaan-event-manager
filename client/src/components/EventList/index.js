import React from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ events }) => {
  if (!events?.length) {
    return <h3>No Upcoming Events</h3>;
  }

  return (
    <div>
      <h3>My Events</h3>
        {events &&
        events.map((singleEvent) => (
          <div key={singleEvent.title} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {singleEvent.title} <br/>
              {/* {singleEvent.description} */}
              {singleEvent.dateTime}
              {singleEvent.address}
            </h4>
              <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/events/${singleEvent._id}`}
              >
              More...
            </Link>
          </div>
        ))}
    </div>
  );
};

export default EventList;