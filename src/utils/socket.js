import { io } from "socket.io-client";

// export const socket = io("http://54.146.252.18:5000", {
//   transports: ["websocket", "polling"], // fallback if websocket fails
//   withCredentials: true
// });

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket", "polling"], // fallback if websocket fails
  withCredentials: true,
  // Connection
  autoConnect: true,
  timeout: 20000,

  // Reconnection
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  randomizationFactor: 0.5,

  // Always create a new Manager if needed
  forceNew: false,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket disconnected:", reason);

  // 🔥 Auto reconnect if server forcefully disconnects
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

socket.on("connect_error", (err) => {
  console.log("Socket error:", err);
});

socket.on("reconnect_attempt", (attempt) => {
  console.log(`🔄 Reconnect attempt #${attempt}`);
});

socket.on("reconnect", (attempt) => {
  console.log(`✅ Reconnected after ${attempt} attempts`);
});