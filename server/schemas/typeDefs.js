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
    maxMembers: Number
    image: String
    notifications: String
    zipCode: Number
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
    _id: ID
    name: String
    email: String
    myClubs: [Club]
    myEvents: [Event]
    participants: [String]
    image: String
    address: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    clubs(category: ID, name: String): [Club]
    club(_id: ID!): Club
    user: User
    order(_id: ID!): Order
    checkout(clubs: [ID]!): Checkout
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addOrder(clubs: [ID]!): Order
    updateUser(name: String, email: String, password: String): User
    updateClub(_id: ID!, spotsAvailable: Int!): Club
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
