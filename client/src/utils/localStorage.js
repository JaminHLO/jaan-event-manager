export const getSavedEventsIds = () => {
  const savedEventIds = localStorage.getItem('saved_events')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedEventIds;
};

export const saveEventIds = (eventIdArr) => {
  if (eventIdArr?.length) {
    localStorage.setItem('saved_events', JSON.stringify(eventIdArr));
  } else {
    localStorage.removeItem('saved_events');
  }
};