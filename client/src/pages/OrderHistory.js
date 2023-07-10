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
      <div className="w-[50rem]">
        {user ? (
          <>
            <Link to="/profile">← Back to Profile</Link>
            <h2 className='font-bold text-xl mb-2'>
              Order History for {user.name}
            </h2>
            {user.orders?.length === 0 ? <h2>No Orders yet</h2> : (
              user.orders.map((order) => (
                <div key={order._id} className="border-solid border-2 rounded-xl flex items-center flex-wrap m-3 p-3">
                  <h2>  
                    <strong>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</strong>
                  </h2>
                  {/* <div className=""> */}
                    {order.clubs.map(({ _id, image, title, price }) => (
                      <div className="card px-1 py-1">
                        <Link to={`/clubs/club/${_id}`}>       
                          <img alt={title} className= "h-32 w-32 rounded-2xl" width="300px" src={image ? image : '/images/club_default.jpg'} />
                          <p>{title}</p>
                        </Link>
                        <div>
                          <span>${price}</span>
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
    </>
  );
}

export default OrderHistory;
