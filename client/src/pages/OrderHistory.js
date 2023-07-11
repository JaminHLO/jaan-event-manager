import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="create-club my-1  flex justify-center items-center min-h-[90vh]">
        <div className='overflow-auto resize-y text-white p-5 bg-black opacity-80 lg:w-1/2 md:3/4 h-auto rounded-2xl text-center transition ease-in-out delay-150 hover:opacity-90'>
        {user ? (
          <>
            <h2 className='text-3xl m-3'>
              Order History for {user.name}
            </h2>
            <Link to="/profile">← Back to Profile</Link>
            {user.orders?.length === 0 ? <h2>No Orders yet</h2> : (
              user.orders.map((order) => (
                <div key={order._id} className="flex justify-center flex-row items-center border-solid border-2 rounded-xl items-center flex-wrap m-3 p-3">
                  <h2>  
                    <strong>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</strong>
                  </h2>
                  {/* <div className=""> */}
                    {order.clubs?.map(({ _id, image, title, price }) => (
                      <div className="flex flex-row items-stretch">
                          <img alt={title} className= "p-1 h-32 w-32 rounded-2xl" width="300px" src={image ? image : '/images/club_default.jpg'} />
                        <div className='flex flex-col justify-center'>  
                          <Link to={`/clubs/club/${_id}`}>       
                            <p>{title}</p>
                          </Link>
                          <p>${price}</p>
                        </div>
                      </div>
                    ))}
                  {/* </div> */}
                </div>
              ))
              ) }
        </>
        ) : 
        <Link to="/login">← Login</Link> }
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
