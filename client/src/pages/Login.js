// Project-3
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="login-logout flex justify-center items-center text-white text-xl">
      <div className="login-container bg-black opacity-50 rounded-2xl h-auto w-2/5 text-center">
        <h2 className='text-4xl m-4'>Login</h2>
        <form onSubmit={handleFormSubmit} className='m-5'>
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
              className="login-input rounded-2xl m-3 text-black"
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button
              className='bg-red-900 cursor-pointer rounded-2xl p-2 m-3'
              type="submit"
              disabled={!(formState.email && formState.password)}
            >Submit
            </button>
            <br></br>
            <Link to="/signup">← Go to Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
