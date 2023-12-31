const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  
  type Category {
    _id: ID
    name: String
  }
  input ClubInput {
    adminId: String
    title: String
    description: String
    category: String
    members: [String]
    maxMembers: Int
    image: String
    zipCode: Int
    price: Float
    spotsAvailable: Int
    notifications: String
    messages: [String]
    geocode: String
    isAvailable: Boolean
  }

  type Club {
    _id: ID
    adminId: String
    title: String
    description: String
    category: Category
    members: [User]    
    maxMembers: Int
    image: String
    zipCode: Int
    price: Float
    spotsAvailable: Int
    notifications: Notification
    messages: [String]
    events: [Event]
    geocode: String
    isAvailable: Boolean
  }

  type Order {
    _id: ID
    purchaseDate: String
    clubs: [Club]
  }

  input UserInput {
    name: String
    email: String
    myClubs: [String]
    myEvents: [String]
    participants: [String]
    image: String
    address: String
    geocode: String
  }

  type User {
    _id: ID!
    name: String
    email: String
    myClubs: [Club]
    myEvents: [Event]
    participants: [String]
    image: String
    address: String
    orders: [Order]
    geocode: String
  }

  type Event {
    _id: ID!
    clubId: Club
    title: String
    description: String
    location: String
    participants: [User]    
    dateTime: String
    image: String
    address: String
    isAvailable: Boolean
    geocode: String
  }

  type Notification {
    _id: ID
    message: String
    dateCreated: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }


  input EventInput {
    clubId: String
    title: String
    description: String
    location: String
    dateTime: String
    image: String
    address: String
    participants: [String]
    isAvailable: Boolean
    geocode: String
  }

  type Query {
    categories: [Category]
    clubs(category: ID, name: String): [Club]
    club(_id: ID!): Club
    user: User
    order(_id: ID!): Order
    checkout(clubs: [ID]!): Checkout
    myEvents(user: ID): User
    event(_id:ID!): Event
    searchEvents(eventQuery: String!, searchRadius: String!): [Event]
    searchClubs(clubQuery: String!): [Club]
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addOrder(clubs: [ID]!): Order
    updateUser(user: UserInput): User
    buyMembership(_id: ID!, spotsAvailable: Int!): Club
    login(email: String!, password: String!): Auth
    createClub(club: ClubInput): Club
    addEvent(event: EventInput, clubId: ID!): Event
    updateEvent(eventId: ID!, event: EventInput): Event
    updateClub(clubId: ID!, club: ClubInput): Club
    joinClub(clubId: ID!): User
    joinEvent(eventId: ID!): User
    createNotifications(message: String!, clubId: ID!): Club
    removeNotifications(clubId: ID!): Club
  }
`;

module.exports = typeDefs;
