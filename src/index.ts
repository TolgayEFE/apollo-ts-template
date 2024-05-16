import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import GraphQLJSON from "graphql-type-json";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import Models from "./models";
import { makeExecutableSchema } from "@graphql-tools/schema";
import CityResolver from "./resolvers/city.resolver";
import TownResolver from "./resolvers/town.resolver";
import cors from "cors";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  plugins: [
    //TODO: Add the plugin to log the request and response of the server.

    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

// Connect to MongoDB database
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

connectToMongoDB();

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Start the server to listen for incoming requests
await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      //TODO: Add authentication logic here
      return {
        ...Models,
      };
    },
  })
);

const port = process.env.PORT || 4000;

await new Promise<void>((resolve) =>
  httpServer.listen({ port: port }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
