import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recentProjects: [],
  latestContent: null,
  articles: [],
  selectedProject: null, // Useful for tracking which project the user is working on
  loading: false,
};

const userSlice = createSlice({
  name: 'user-dashboard',
  initialState,
  reducers: {
    // specific reducers for your API data
    setRecentProjects: (state, action) => {
      state.recentProjects = action.payload;
    },
    setLatestContent: (state, action) => {
      state.latestContent = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    
    // UI state reducers
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Clear data (useful when user logs out, called alongside clearAuth)
    clearUserData: (state) => {
      state.recentProjects = [];
      state.latestContent = null;
      state.articles = [];
      state.selectedProject = null;
      state.loading = false;
    }
  }
});

export const { 
  setRecentProjects, 
  setLatestContent, 
  setArticles, 
  setSelectedProject, 
  setLoading, 
  clearUserData 
} = userSlice.actions;

export default userSlice.reducer;