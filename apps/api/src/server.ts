import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs, resolvers } from "./schema";
import { verifyJWT } from "./utils/token";
import { findUserByEmail } from "./model/userStore";
import { db as drizzleDb } from "./db/drizzle";
// Tambahan untuk load .env root
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const fastify = Fastify();

fastify.get("/health", async () => ({ status: "ok" }));

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/graphql",
  context: async ({ request }: any) => {
    const auth = request.headers.get("authorization");
    let user = undefined;
    if (auth) {
      try {
        const payload = verifyJWT(auth.replace("Bearer ", ""));
        user = await findUserByEmail(payload.email);
      } catch {}
    }
    return {
      user,
      drizzle: drizzleDb,
    };
  },
});

fastify.route({
  method: ["GET", "POST", "OPTIONS"],
  url: "/graphql",
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const response = await yoga.handleNodeRequest(req.raw);
    response.headers.forEach((value: string, key: string) => {
      reply.header(key, value);
    });
    reply.status(response.status);
    reply.send(response.body);
    return reply;
  },
});

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;
fastify.listen(
  { port, host: "0.0.0.0" },
  (err: Error | null, address: string) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Ganti output log agar tampil localhost
    const localUrl = `http://localhost:${port}`;
    console.log(`API ready at ${localUrl}`);
    console.log(`GraphQL at ${localUrl}/graphql`);
  }
);
