import { gql } from '@apollo/client';

export const QUERY_CLUBS = gql`
query getClubs($category: ID) {
  clubs(category: $category) {
    _id
    adminId
    events {
      title
      description
      location
      dateTime
      image
      address
      isAvailable
    }
    title
    description
    maxMembers
    image
    notifications {
      _id
    }
    zipCode
    messages
    price
    spotsAvailable
    isAvailable
    geocode
    category {
      _id
    }
  }
}
`;

export const QUERY_CLUB = gql`
  query getClub($id: ID!) {
  club(_id: $id) {
    _id
    adminId
    isAvailable
    members {
      _id
      name
    }
    events {
      _id
      title
      description
      location
      dateTime
      image
      address
      isAvailable
      geocode
    }
    title
    description
    maxMembers
    image
    notifications {
      _id
      message
    }
    zipCode
    messages
    price
    spotsAvailable
    geocode
  }
}`

export const QUERY_ME = gql`
query Query {
  me {
    _id
    name
    email
    myEvents {
      _id
      title
      description
      location
      dateTime
      image
    }
    participants
    image
    address
    geocode
    myClubs {
      _id
      adminId
      title
      description
      maxMembers
      image
      notifications {
        _id
      }
      zipCode
      messages
      price
      spotsAvailable
      events {
        _id
      }
    }
  }
}`

export const QUERY_MY_EVENTS = gql`
query MyEvents {
  myEvents {
    myEvents {
      _id
      club {
        title
        _id
      }
      title
      description
      location
      dateTime
      image
      participants {
        name
      }
      address
      isAvailable
      geocode
    }
  }
}`

export const QUERY_MY_CLUBS = gql`
query Me {
  me {
    myClubs {
      _id
      adminId
      events {
        _id
        title
        description
      }
      title
      description
      category {
        _id
        name
      }
      maxMembers
      image
      notifications {
        _id
        message
      }
      zipCode
      messages
      price
      spotsAvailable
      geocode
    }
  }
}`

export const QUERY_EVENT = gql`
query EventById($id: ID!) {
  event(_id: $id) {
    _id
    clubId {
      title
      _id
      adminId
    }
    title
    description
    participants {
      _id
      name
    }
    location
    dateTime
    image
    address
    isAvailable
    geocode
  }
}`

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($clubs: [ID]!) {
    checkout(clubs: $clubs) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  query User {
  user {
    name
    orders {
      purchaseDate
      _id
      clubs {
        _id
        title
        image
        price
        description
      }
    }
  }
}
`;

export const QUERY_SEARCH_EVENTS = gql`
  query SearchEvents($eventQuery: String!, $searchRadius: String!) {
    searchEvents(eventQuery: $eventQuery, searchRadius: $searchRadius) {
      _id
      title
      dateTime
      description
      isAvailable
      geocode
      image
      clubId {
        geocode
        _id
        category {
          _id
          name
        }
      }
    }
  }
`;

export const QUERY_SEARCH_CLUBS = gql`
  query SearchEvents($clubQuery: String!) {
   searchClubs(clubQuery: $clubQuery) {
      _id
      title
      description
      image
      spotsAvailable
      geocode
      category {
        _id
        name
      }
  }
}
`;
