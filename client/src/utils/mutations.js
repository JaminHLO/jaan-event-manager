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
  mutation addOrder($clubs: [ID]!) {
    addOrder(clubs: $clubs) {
      purchaseDate
      clubs {
        _id
        title
        description
        price
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
    geocode
  }
}`;

export const UPDATE_EVENT = gql`
mutation updatedEvent($eventId: ID!, $event: EventInput) {
  updateEvent(eventId: $eventId, event: $event) {
    title
    description
    location
    dateTime
    image
    address
    isAvailable
    geocode
  }
}`

export const UPDATE_CLUB = gql`
mutation updateClub($clubId: ID!, $club: ClubInput) {
  updateClub(clubId: $clubId, club: $club) {
    title
    description
    maxMembers
    image
    price
  }
}`

export const CREATE_CLUB = gql`
mutation CreateClub($club: ClubInput) {
  createClub(club: $club) {
    _id
    adminId
    title
    description
    maxMembers
    image
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
    clubId {
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
    geocode
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
      clubId {
        _id
        title
      }
      title
    }
  }
}`

export const CREATE_NOTIFICATIONS = gql`
  mutation Mutation($message: String!, $clubId: ID!) {
  createNotifications(message: $message, clubId: $clubId) {
    _id
    notifications {
      _id
      message
      dateCreated
    }
  }
}
`;

export const REMOVE_NOTIFICATIONS = gql`
  mutation RemoveNotifications($clubId: ID!) {
  removeNotifications(clubId: $clubId) {
    _id
    notifications {
      _id
    }
  }
}
`;

export const BUY_MEMBERSHIP = gql`
  mutation BuyMembership($id: ID!, $spotsAvailable: Int!) {
    buyMembership(_id: $id, spotsAvailable: $spotsAvailable) {
      title
      maxMembers
      spotsAvailable
    }
  }`