import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Original State
  recentProjects: [],
  latestContent: null,
  articles: [],
  allProjects: [],
  selectedProject: null,
  loading: false,

  // Remaining State fields based on your API list
  projectPatent: null,
  projectProvisional: null,
  projectNonProvisional: null,
  projectProduct: null,
  projectPublication: null,
  analystConnection: null,
};

const userSlice = createSlice({
  name: 'userDashboard',
  initialState,
  reducers: {
    // Existing Reducers
    setRecentProjects: (state, action) => {
      state.recentProjects = action.payload;
    },
    setLatestContent: (state, action) => {
      state.latestContent = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setAllProjects: (state, action) => {
      state.allProjects = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProjectPatent: (state, action) => {
      state.projectPatent = action.payload;
    },
    setProjectProvisional: (state, action) => {
      state.projectProvisional = action.payload;
    },
    setProjectNonProvisional: (state, action) => {
      state.projectNonProvisional = action.payload;
    },
    setProjectProduct: (state, action) => {
      state.projectProduct = action.payload;
    },
    setProjectPublication: (state, action) => {
      state.projectPublication = action.payload;
    },
    setAnalystConnection: (state, action) => {
      state.analystConnection = action.payload;
    },

    // Updated Clear Data
    clearUserData: (state) => {
      return initialState; // Resets everything to the default state
    }
  }
});

export const { 
  setRecentProjects, 
  setLatestContent, 
  setArticles,
  setAllProjects,
  setSelectedProject, 
  setLoading, 
  setProjectPatent,
  setProjectProvisional,
  setProjectNonProvisional,
  setProjectProduct,
  setProjectPublication,
  setAnalystConnection,
  clearUserData 
} = userSlice.actions;

export default userSlice.reducer;