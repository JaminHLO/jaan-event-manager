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

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
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
