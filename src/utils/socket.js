import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
});

socket.on("connect", () => {
    console.log("Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("Socket Disconnected");
});