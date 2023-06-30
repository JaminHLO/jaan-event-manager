import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {  
      addUser(name: $name, email: $email, password: $password) {
        token
        user {
          _id
          name
        }
      }
    }
`;

export const UPDATE_USER = gql`
mutation updateUser($user: UserInput) {
  updateUser(user: $user) {
    name
    email
    participants
    image
    address
  }
}`;

export const CREATE_CLUB = gql`
mutation createClub($club: ClubInput) {
  createClub(club: $club) {
    _id
    adminId
    title
    description
    maxMembers
    image
    notifications
    zipCode
    messages
    price
    spotsAvailable
    category {
      name
    }
  }
}
`

export const ADD_EVENT = gql`
mutation AddEvent($clubId: ID!, $event: EventInput) {
  addEvent(clubId: $clubId, event: $event) {
    _id
    club {
      _id
      title
    }
    title
    description
    location
    dateTime
    image
    address
    isAvailable
  }
}
`