import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './styles.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'

import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import UpdateProfile from './components/UpdateProfile';
import CreateClub from './components/CreateClub';
import ClubDetail from './components/ClubDetail';
import Clubs from './pages/Clubs';
import SearchEvents from './components/SearchEvents';
import SearchClubs from './components/SearchClubs';
import EventDetail from './components/EventDetail'; 
import Contact from './components/About';

console.log('process.env.MONGODB_URI is:', process.env.REACT_APP_MONGODB_URI)

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_MONGODB_URI || 'http://localhost:3001/graphql', 
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/profile/update"
                element={<UpdateProfile />}
              />
              <Route
                path="/clubs"
                element={<Clubs />}
              />
              <Route
                path="/clubs/create"
                element={<CreateClub />}
              />
              <Route
                path="/success"
                element={<Success />}
              />
              <Route
                path="/orderHistory"
                element={<OrderHistory />}
              />
              <Route
                path="/products/:id"
                element={<Detail />}
              />
              <Route
                path="/clubs/club/:id"
                element={<ClubDetail />}
              />
              <Route
                path="/events/event/:id"
                element={<EventDetail />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
              <Route 
                path='/searchEvents'
                element={<SearchEvents />}
              />
              <Route 
                path='/searchClubs'
                element={<SearchClubs />}
              />
              <Route
                path='/contact'
                element={<Contact />}
              />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
