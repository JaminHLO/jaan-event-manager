const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Club {
    _id: ID
    adminId: String
    events: [Event]
    title: String
    description: String
    category: Category
    members: [User]    
    maxMembers: Int
    image: String
    notifications: String
    zipCode: Int
    messages: [String]
    price: Float
    spotsAvailable: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    clubs: [Club]
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
  }

  type Event {
    _id: ID!
    club: Club
    title: String
    description: String
    location: String
    participants: [User]    
    dateTime: String
    image: String
    address: String
    isAvailable: Boolean
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input UserInput {
    name: String
    email: String
    myClubs: [String]
    myEvents: [String]
    participants: [String]
    image: String
    address: String
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
  }

  type Query {
    categories: [Category]
    clubs(category: ID, name: String): [Club]
    club(_id: ID!): Club
    user: User
    order(_id: ID!): Order
    checkout(clubs: [ID]!): Checkout
    myEvents(user: ID): User
    eventById(_id:ID!): Event
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addOrder(clubs: [ID]!): Order
    updateUser(user: UserInput): User
    buyMembership(_id: ID!, spotsAvailable: Int!): Club
    login(email: String!, password: String!): Auth
    addClub(club: ClubInput): Club
    addEvent(event: EventInput, clubId: ID!): Event
    updateEvent(eventId: ID!, event: EventInput): Event
    updateClub(clubId: ID!, club: ClubInput): Club
    joinClub(clubId: ID!): User
    joinEvent(eventId: ID!): User
  }
`;

module.exports = typeDefs;
