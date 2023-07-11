import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER, JOIN_CLUB, BUY_MEMBERSHIP } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [joinClub] = useMutation(JOIN_CLUB);
  const [buyMembership] = useMutation(BUY_MEMBERSHIP);

  useEffect(() => {
    async function saveOrder() {
      const clubsData = await idbPromise('clubs', 'get');
      const clubs = clubsData.map((club) => club._id);
      const newClubId = clubs[clubs.length - 1]
      console.log(newClubId)
      console.log(clubs)
      try {
        const { data: orderData } = await addOrder({
          variables: { clubs }
        });
        const { newClubData } = await buyMembership({
          variables: { id: newClubId, spotsAvailable: 1 }
        });
        console.log(newClubData)
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
    <div className="login-logout flex justify-center items-center text-white text-xl">
      <div className="login-container transition ease-in-out delay-150 bg-black opacity-80 rounded-2xl h-auto w-2/5 text-center">
        <h1 className='text-4xl m-4'>Success!</h1>
        <h3 className='text-4xl m-4'>Thank you for your purchase!</h3>
        <h3 className='text-4xl m-4'>Welcome to the club!</h3>
        <h2 className='text-4xl m-4'>You will shortly be redirected to the home page.</h2>
      </div>
    </div>
  );
}

export default Success;
