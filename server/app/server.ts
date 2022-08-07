import "reflect-metadata";
import * as http from "http";
import express from "express";
import * as socketio from "socket.io";
import cors from "cors";
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";

import { AuthorController, BookController } from "./controllers";
import { Author, Book } from "./entities";
import { listenForWSEvents } from "./modules/websocket";

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  authorRepository: EntityRepository<Author>;
  bookRepository: EntityRepository<Book>;
};

export const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3000;

export const init = (async () => {
  app.use(express.json());
  app.get("/", (req, res) => res.json({ message: "Welcome!" }));
  app.use((req, res) => res.status(404).json({ message: "No route found" }));
  app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
  listenForWSEvents(io);

  server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
})();
