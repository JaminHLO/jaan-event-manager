import React from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ events }) => {
  if (!events?.length) {
    return <h3>No Upcoming Events</h3>;
  }

  return (
    <div>
      {/* <h3>My Events</h3> */}
        {events &&
        events.map((singleEvent) => (
          <div key={singleEvent._id} className="max-w-sm rounded overflow-hidden shadow-lg">
              { !singleEvent.image ? (
                <img className="w-full" 
                src= './images/event_default.jpg' />
              ) : (
                <img className="w-full" 
                src= {singleEvent.image} />
              )}
            <div className="px-6 py-4">
              <div className='font-bold text-xl mb-2'>
                {singleEvent.title}
              </div>
              <p className='text-gray-700 text-base'>
                {singleEvent.description}
                </p>
                <ul>
                  <li>{singleEvent.dateTime}</li>
                  <li>{singleEvent.address}</li>
                </ul>

            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <Link
                    to={`/events/event/${singleEvent._id}`}
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

export default EventList;