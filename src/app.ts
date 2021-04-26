import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { UserResolver, PostResolver, CategoryResolver } from "./resolver";
import { context } from "./context";
import config from "./config";
import { formatError } from "./formatError";

export const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CategoryResolver],
    validate: false,
  });

  new ApolloServer({
    schema,
    context: ({ req }) => {
      context.token = req.headers.authorization || "";
      return context;
    },
    debug: false,
    cors: true,
    formatError,
  }).listen({ port: config.SERVER_PORT }, () => {
    console.log(`Server listening at ${config.SERVER_PORT} port!`);
  });
};
