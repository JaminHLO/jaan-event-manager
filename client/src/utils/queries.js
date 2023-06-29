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
    notifications
    zipCode
    messages
    price
    spotsAvailable
  }
}
`;

export const QUERY_CLUB = gql`
  query getClub($id: ID!) {
  club(_id: $id) {
    _id
    adminId
    events {
      _id
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
    notifications
    zipCode
    messages
    price
    spotsAvailable
  }
}`

export const QUERY_ME = gql`
query Me {
  me {
    _id
    name
    email
    myClubs {
      _id
      adminId
      title
      description
      category {
        _id
        name
      }
      maxMembers
      image
      notifications
      zipCode
      messages
      price
      spotsAvailable
    }
    myEvents {
      _id
      club {
        title
        _id
      }
      title
      dateTime
    }
    participants
    image
    address
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
      notifications
      zipCode
      messages
      price
      spotsAvailable
    }
  }
}`

export const QUERY_EVENT = gql`
query EventById($id: ID!) {
  eventById(_id: $id) {
    _id
    club {
      title
      _id
    }
    title
    description
    participants {
      name
    }
    location
    dateTime
    image
    address
    isAvailable
  }
}`

// Next from starter code

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
