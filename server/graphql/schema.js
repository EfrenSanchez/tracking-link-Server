const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers.js");

const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  
  type Query {
    user: User
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    createUser(input: UserInput): User
    # deleteUser(_id: ID): User
    # updateUser(_id: ID, input: UserInput): User
  }
`;
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
