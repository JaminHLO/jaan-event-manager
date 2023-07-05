import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER, JOIN_CLUB } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [joinClub] = useMutation(JOIN_CLUB);

  useEffect(() => {
    async function saveOrder() {
      const clubsData = await idbPromise('clubs', 'get');
      const clubs = clubsData.map((club) => club._id);

      try {
        const { data: orderData } = await addOrder({
          variables: { clubs }
        });
        const { data: joinData } = await clubs.map((clubId) => {
          joinClub({
            variables: { clubId }
          })
        })
        const checkoutClubsData = orderData.addOrder.clubs
        checkoutClubsData.forEach((club) => {
          idbPromise("clubs", "delete", club)
        })
      } catch (error) {
        console.error(error)
      }
    
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder, joinClub]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>Welcome to the club!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
