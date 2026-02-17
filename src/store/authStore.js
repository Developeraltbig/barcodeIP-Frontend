import axios from "axios";
import { create } from "zustand";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const useAuthStore = create((set, get) => ({
  user: null,
  socket: null,
  isCheckingAuth: true,
  isAuthenticated: false,
  showConsultModal: false,
  consultSelectedProjectId: null,

  checkAuth: async () => {
    try {
      const response = await axios.get("/api/auth/check");
      set({
        user: response.data.data,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      get().connectSocket();
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.error("User not authenticated:", error);
      }
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
      get().disconnectSocket();
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post("/api/auth/login", userData);
      set({
        user: response.data.data,
        isAuthenticated: true,
      });
      toast.success(`Welcome back, ${response.data.data.name.split(" ")[0]}!`);
      get().connectSocket();
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.error("Login Failed:", error);
      }
      set({
        user: null,
        isAuthenticated: false,
      });
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
      );
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      set({
        user: response.data.data,
        isAuthenticated: true,
      });
      toast.success(`Welcome, ${response.data.data.name.split(" ")[0]}!`);
      get().connectSocket();
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.error("Registration Failed:", error);
      }
      set({
        user: null,
        isAuthenticated: false,
      });
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
      );
    }
  },

  logout: async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      if (!import.meta.env.PROD) {
        console.error("Logout Failed:", error);
      }
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
      get().disconnectSocket();
    }
  },

  toggleConsultModal: (projectId) => {
    if (projectId && !get().showConsultModal) {
      set({
        consultSelectedProjectId: projectId,
        showConsultModal: !get().showConsultModal,
      });
    } else {
      set({
        consultSelectedProjectId: null,
        showConsultModal: !get().showConsultModal,
      });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) {
      return;
    }

    const socketOptions = {
      query: {
        userId: user._id,
      },
      transports: ["polling"], // Start with polling, then upgrade
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true,
    };

    const socket = import.meta.env.PROD
      ? io(socketOptions)
      : io(import.meta.env.VITE_API_URL, socketOptions);

    socket.connect();
    set({ socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useAuthStore;
