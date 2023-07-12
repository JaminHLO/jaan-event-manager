import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ name: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const [signupError, setSignupError] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          name: formState.name,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);

    } catch (error) {
      setSignupError(true)
    }
  };

  if (signupError) {
    return (
      <div className="login-logout flex justify-center items-center text-white text-xl">
        <div className="login-container transition ease-in-out delay-150 bg-black opacity-80 rounded-2xl h-auto w-2/5 text-center">
          <p className='text-4xl m-4'>This email has already been used.</p>
          <p className='text-4xl m-4'>Please try a different one.</p>
          <Link className="m-3" to='/signup' >← Back to Signup</Link>
        </div>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="login-logout flex justify-center items-center text-white text-xl">
      <div className="login-container transition ease-in-out delay-150 bg-black opacity-50 hover:opacity-70 rounded-2xl h-auto lg:w-2/5 xs:w-screen text-center">
        <h2 className='text-4xl m-4'>Signup</h2>
        <form onSubmit={handleFormSubmit} className='m-5'>
          <div className="flex-row space-between my-2">
            <label htmlFor="Name"></label>
            <input
              className="login-input rounded-2xl m-3"
              placeholder="Name"
              name="name"
              type="name"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email"></label>
            <input
              className="login-input rounded-2xl m-3"
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd"></label>
            <input
              className="login-input rounded-2xl m-3"
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button
              className='transition ease-in-out delay-150 bg-red-900 cursor-pointer rounded-2xl p-2 m-3 hover:bg-rose-950'
              type="submit"
              disabled={!(formState.name && formState.email && formState.password)}
            >Submit
            </button>
            <br></br>
            <Link to="/login">← Go to Login</Link>
          </div>
        </form>
      </div>
    </div >
  );
}

export default Signup;
