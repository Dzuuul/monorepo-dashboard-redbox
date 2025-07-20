import { LogModel, connectMongoose } from '../db/mongoose';

export const dbInfoTypeDefs = /* GraphQL */ `
  extend type Query {
    dbInfo: String!
    logs: [Log!]!
  }
  type Log {
    id: ID!
    message: String!
    createdAt: String!
  }
  extend type Mutation {
    addLog(message: String!): Log!
  }
`;

export const dbInfoResolvers = {
  Query: {
    dbInfo: async (_: any, __: any, ctx: any) => {
      const pg = await ctx.pg.query('SELECT 1 as ok');
      // Cek koneksi mongoose
      await connectMongoose();
      const mongoOk = LogModel ? 1 : 0;
      return `Postgres OK: ${pg.rows[0].ok}, Mongo OK: ${mongoOk}`;
    },
    logs: async () => {
      await connectMongoose();
      const logs = await LogModel.find().sort({ createdAt: -1 }).limit(10);
      return logs.map((log: any) => ({
        id: log._id.toString(),
        message: log.message,
        createdAt: log.createdAt.toISOString(),
      }));
    },
  },
  Mutation: {
    addLog: async (_: any, { message }: any) => {
      await connectMongoose();
      const log = await LogModel.create({ message });
      return {
        id: log._id.toString(),
        message: log.message,
        createdAt: log.createdAt.toISOString(),
      };
    },
  },
}; 