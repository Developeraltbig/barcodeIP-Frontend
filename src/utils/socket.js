import { io } from "socket.io-client";

export const socket = io("http://54.146.252.18:5000");

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
    console.log("Socket error:", err);
});