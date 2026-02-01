// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClient'

// // export const registerUser = createAsyncThunk(
// //   'auth/register',
// //   async (userData, { rejectWithValue }) => {
// //     try {
// //     const response =  await axiosClient.post('/user/register', userData);
// //     return response.data.user;
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/register', userData, {
//         withCredentials: true, // cookie ke liye
//       });
//       return response.data.user;
//     } catch (error) {
//       // yahan sirf serializable message bhejna
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const checkAuth = createAsyncThunk(
//   'auth/check',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/user/check');
//       return data.user;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         return rejectWithValue(null); // Special case for no session
//       }
//       return rejectWithValue(error);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/user/logout');
//       return null;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register User Cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Login User Cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Check Auth Cases
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
  
//       // Logout User Cases
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   }
// });

// export default authSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClient';

// // Register User
// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/register', userData, { withCredentials: true });
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Login User
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials, { withCredentials: true });
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Check Auth
// export const checkAuth = createAsyncThunk(
//   'auth/check',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/user/check', { withCredentials: true });
//       return data.user;
//     } catch (error) {
//       if (error.response?.status === 401) return rejectWithValue('Not authenticated');
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Logout User
// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/user/logout', {}, { withCredentials: true });
//       return null;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; })
//       .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

//       // Login
//       .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; })
//       .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

//       // Check Auth
//       .addCase(checkAuth.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(checkAuth.fulfilled, (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; })
//       .addCase(checkAuth.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

//       // Logout
//       .addCase(logoutUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = null; })
//       .addCase(logoutUser.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Something went wrong'; state.isAuthenticated = false; state.user = null; });
//   }
// });

// export default authSlice.reducer;




// // src/authSlice.js - Updated to store token
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClient';

// // Register User
// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/register', userData, { withCredentials: true });
//       // Store token if available
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Login User
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials, { withCredentials: true });
//       // Store token if available
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Check Auth
// export const checkAuth = createAsyncThunk(
//   'auth/check',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/user/check', { withCredentials: true });
//       return data.user;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         return rejectWithValue('Not authenticated');
//       }
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Logout User
// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/user/logout', {}, { withCredentials: true });
//       localStorage.removeItem('token');
//       return null;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; })
//       .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

//       // Login
//       .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; })
//       .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

//       // Check Auth
//       .addCase(checkAuth.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(checkAuth.fulfilled, (state, action) => { state.loading = false; state.isAuthenticated = !!action.payload; state.user = action.payload; })
//       .addCase(checkAuth.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

//       // Logout
//       .addCase(logoutUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = null; })
//       .addCase(logoutUser.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Something went wrong'; state.isAuthenticated = false; state.user = null; });
//   }
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;


//Final Version 
// src/authSlice.js - Updated to store token
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from './utils/axiosClient';

// Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/register', userData, { withCredentials: true });
      // Store token if available
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      console.log('Register response user:', response.data.user); // Debug log
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials, { withCredentials: true });
      // Store token if available
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      console.log('Login response user:', response.data.user); // Debug log
      console.log('Login response user role:', response.data.user?.role); // Debug log
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Check Auth
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/user/check', { withCredentials: true });
      console.log('CheckAuth response user:', data.user); // Debug log
      console.log('CheckAuth response user role:', data.user?.role); // Debug log
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        return rejectWithValue('Not authenticated');
      }
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post('/user/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Add this new action to manually update user data
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { 
        state.loading = false; 
        state.isAuthenticated = !!action.payload; 
        state.user = action.payload; 
        console.log('Register fulfilled - user role:', action.payload?.role); // Debug log
      })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { 
        state.loading = false; 
        state.isAuthenticated = !!action.payload; 
        state.user = action.payload; 
        console.log('Login fulfilled - user role:', action.payload?.role); // Debug log
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

      // Check Auth
      .addCase(checkAuth.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(checkAuth.fulfilled, (state, action) => { 
        state.loading = false; 
        state.isAuthenticated = !!action.payload; 
        state.user = action.payload; 
        console.log('CheckAuth fulfilled - user role:', action.payload?.role); // Debug log
      })
      .addCase(checkAuth.rejected, (state, action) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = action.payload || 'Something went wrong'; })

      // Logout
      .addCase(logoutUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.isAuthenticated = false; state.user = null; state.error = null; })
      .addCase(logoutUser.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Something went wrong'; state.isAuthenticated = false; state.user = null; });
  }
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;






// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClient';

// // Helper function to fetch complete user data with role
// const fetchCompleteUserData = async () => {
//   try {
//     const { data } = await axiosClient.get('/user/check', { withCredentials: true });
//     console.log('Complete user data fetched:', data.user);
//     return data.user;
//   } catch (error) {
//     console.error('Error fetching complete user data:', error);
//     throw error;
//   }
// };

// // Register User
// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/register', userData, { withCredentials: true });
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
//       console.log('Register response user:', response.data.user);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Login User - FIXED: Fetch complete user data if role is missing
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/user/login', credentials, { withCredentials: true });
      
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
      
//       console.log('Login response user:', response.data.user);
//       console.log('Login response user role:', response.data.user?.role);
      
//       let userData = response.data.user;
      
//       // If role is missing, fetch complete user data
//       if (userData && !userData.role) {
//         console.log('Role missing in login response, fetching complete user data...');
//         try {
//           userData = await fetchCompleteUserData();
//           console.log('Complete user data after login:', userData);
//         } catch (fetchError) {
//           console.error('Failed to fetch complete user data after login:', fetchError);
//           // Continue with original user data even if fetch fails
//         }
//       }
      
//       return userData;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Check Auth
// export const checkAuth = createAsyncThunk(
//   'auth/check',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/user/check', { withCredentials: true });
//       console.log('CheckAuth response user:', data.user);
//       console.log('CheckAuth response user role:', data.user?.role);
//       return data.user;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         return rejectWithValue('Not authenticated');
//       }
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Logout User
// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/user/logout', {}, { withCredentials: true });
//       localStorage.removeItem('token');
//       return null;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     updateUser: (state, action) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload };
//         console.log('User updated with role:', action.payload?.role);
//       }
//     },
//     // New action to force refresh user data
//     refreshUserData: (state) => {
//       // This will trigger components to refetch user data
//       state.user = { ...state.user }; // Create new reference to trigger re-renders
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => { 
//         state.loading = true; 
//         state.error = null; 
//       })
//       .addCase(registerUser.fulfilled, (state, action) => { 
//         state.loading = false; 
//         state.isAuthenticated = !!action.payload; 
//         state.user = action.payload; 
//         console.log('Register fulfilled - user role:', action.payload?.role);
//       })
//       .addCase(registerUser.rejected, (state, action) => { 
//         state.loading = false; 
//         state.isAuthenticated = false; 
//         state.user = null; 
//         state.error = action.payload || 'Something went wrong'; 
//       })

//       // Login - FIXED: Added proper logging
//       .addCase(loginUser.pending, (state) => { 
//         state.loading = true; 
//         state.error = null; 
//       })
//       .addCase(loginUser.fulfilled, (state, action) => { 
//         state.loading = false; 
//         state.isAuthenticated = !!action.payload; 
//         state.user = action.payload; 
//         console.log('Login fulfilled - user role:', action.payload?.role);
//         console.log('Login fulfilled - complete user:', action.payload);
//       })
//       .addCase(loginUser.rejected, (state, action) => { 
//         state.loading = false; 
//         state.isAuthenticated = false; 
//         state.user = null; 
//         state.error = action.payload || 'Something went wrong'; 
//       })

//       // Check Auth
//       .addCase(checkAuth.pending, (state) => { 
//         state.loading = true; 
//         state.error = null; 
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => { 
//         state.loading = false; 
//         state.isAuthenticated = !!action.payload; 
//         state.user = action.payload; 
//         console.log('CheckAuth fulfilled - user role:', action.payload?.role);
//       })
//       .addCase(checkAuth.rejected, (state, action) => { 
//         state.loading = false; 
//         state.isAuthenticated = false; 
//         state.user = null; 
//         state.error = action.payload || 'Something went wrong'; 
//       })

//       // Logout
//       .addCase(logoutUser.pending, (state) => { 
//         state.loading = true; 
//         state.error = null; 
//       })
//       .addCase(logoutUser.fulfilled, (state) => { 
//         state.loading = false; 
//         state.isAuthenticated = false; 
//         state.user = null; 
//         state.error = null; 
//       })
//       .addCase(logoutUser.rejected, (state, action) => { 
//         state.loading = false; 
//         state.error = action.payload || 'Something went wrong'; 
//         state.isAuthenticated = false; 
//         state.user = null; 
//       });
//   }
// });

// export const { clearError, updateUser, refreshUserData } = authSlice.actions;
// export default authSlice.reducer;