import React from 'react'; // use to have useState
import { Link } from 'react-router-dom';
import sadIcon from '../../images/sad-face-icon.png';

// import EventDetailModal from "../EventDetailModal";

const EventList = ({ events }) => {
  // const [showEventModal, setShowEventModal] = useState(false)
  //   const openEventModal = () => {
  //       setShowEventModal(showEventModal=>!showEventModal)
  //   }
  //   const [modalEventData, setModalEventData] = useState(null);

  if (!events?.length) {
    return (
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h3 className="text-xl">No Upcoming Events</h3>
        <img src={sadIcon} alt='sad face no events'></img>
      </div>
    )
  }

  return (
    <div className='w-full'>
      {events &&
        events.map((singleEvent) => (
          <div key={singleEvent._id} className="border-solid border-2 rounded-xl flex items-center flex-wrap m-3 p-3">
            {!singleEvent.image ? (
              <img className="h-32 w-32 rounded-2xl"
                src="/images/event_default.jpg"
                alt='default event' />
            ) : (
              <img className="h-32 w-32 rounded-2xl"
                src={singleEvent.image}
                alt='single event' />
            )}
            <div className="m-5">
              <div className='font-bold text-xl mb-2'>
                {singleEvent.title}
              </div>
              {/* <p className='text-gray-700 text-base'>
                {singleEvent.description}
              </p> */}
              <ul>
                <li>{singleEvent.dateTime}</li>
                <li>{singleEvent.address}</li>
              </ul>
              <div className='mt-2'>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <Link
                    to={`/events/event/${singleEvent._id}`}
                  >
                    More...
                  </Link>
                </span>
              </div>

            </div>
            <div className="px-6 pt-4 pb-2">
            </div>



          </div>
        ))}
    </div>
  );
};

export default EventList;