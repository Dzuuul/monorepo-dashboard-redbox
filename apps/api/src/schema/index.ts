import { authTypeDefs, authResolvers } from './auth';
import { dbInfoTypeDefs, dbInfoResolvers } from './dbInfo';

export const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
    me: User
    dbInfo: String!
  }
  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
  type User {
    id: ID!
    email: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  ${dbInfoTypeDefs}
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    ...authResolvers.Query,
    ...dbInfoResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
}; 