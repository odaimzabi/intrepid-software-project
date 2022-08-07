import * as socketio from "socket.io";
import { nanoid } from "nanoid";

export function listenForWSEvents(io: socketio.Server) {
  io.on("connection", (socket) => {
    console.log(`User connected ! ${socket.id}`);

    socket.emit("user-ack", { id: socket.id });

    socket.on("ping", () => {
      const id = nanoid();
      socket.emit("pong", id);
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected ${socket.id}`);
    });
  });
}
