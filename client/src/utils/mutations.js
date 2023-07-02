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
mutation CreateClub($adminId: String, $title: String!, $description: String, $maxMembers: Int, $image: String, $price: Float, $category: String, $zipCode: Int, $geocode: String) {
  createClub(adminId: $adminId, title: $title, description: $description, maxMembers: $maxMembers, image: $image, price: $price, category: $category, zipCode: $zipCode, geocode: $geocode) {
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
    geocode
  }
}
`

export const ADD_EVENT = gql`
mutation AddEvent($event: EventInput, $clubId: ID!) {
  addEvent(event: $event, clubId: $clubId) {
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

export const JOIN_CLUB = gql`
mutation JoinClub($clubId: ID!) {
  joinClub(clubId: $clubId) {
    name
    myClubs {
      title
      _id
    }
  }
}`

export const JOIN_EVENT = gql`
mutation JoinEvent($eventId: ID!) {
  joinEvent(eventId: $eventId) {
    name
    _id
    myEvents {
      _id
      club {
        _id
        title
      }
      title
    }
  }
}`