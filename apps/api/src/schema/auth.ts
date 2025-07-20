import { registerUser, loginUser, findUserByEmail, User } from '../model/userStore';
import { generateJWT } from '../utils/token';
import validator from 'validator';

export const authTypeDefs = /* GraphQL */ `
  type User {
    id: ID!
    email: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Query {
    me: User
  }
  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

function validateAuthInput(email: string, password: string) {
  if (!validator.isEmail(email)) {
    throw new Error('Email tidak valid');
  }
  if (!validator.isLength(password, { min: 6 })) {
    throw new Error('Password minimal 6 karakter');
  }
}

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) return null;
      return findUserByEmail(ctx.user.email);
    },
  },
  Mutation: {
    register: async (_: any, { email, password }: any) => {
      validateAuthInput(email, password);
      const user = await registerUser(email, password);
      const token = generateJWT({ id: user.id, email: user.email });
      return { token, user };
    },
    login: async (_: any, { email, password }: any) => {
      validateAuthInput(email, password);
      const user = await loginUser(email, password);
      const token = generateJWT({ id: user.id, email: user.email });
      return { token, user };
    },
  },
}; 