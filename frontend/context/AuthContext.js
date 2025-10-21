// // frontend/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// // import { AsyncStorage } from 'react-native'; // or @react-native-async-storage/async-storage
// import { AsyncStorage } from 'react-native'; //  old
// // import AsyncStorage from '@react-native-async-storage/async-storage'; //  correct

// import jwtDecode from 'jwt-decode';
// import { loginUser, refreshToken } from '../services/userService';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);

//   const signIn = async (email, password) => {
//     const response = await loginUser(email, password);
//     if (response?.accessToken) {
//       setAccessToken(response.accessToken);
//       const decoded = jwtDecode(response.accessToken);
//       setUser({ ...decoded, role: decoded.usertype });
//       await AsyncStorage.setItem('accessToken', response.accessToken);
//       await AsyncStorage.setItem('refreshToken', response.refreshToken);
//     }
//     return response;
//   };

//   const signOut = async () => {
//     setUser(null);
//     setAccessToken(null);
//     await AsyncStorage.removeItem('accessToken');
//     await AsyncStorage.removeItem('refreshToken');
//   };

//   const loadUser = async () => {
//     const token = await AsyncStorage.getItem('accessToken');
//     if (token) {
//       setAccessToken(token);
//       const decoded = jwtDecode(token);
//       setUser({ ...decoded, role: decoded.usertype });
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, accessToken, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from 'react';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native'; //  old
// import jwtDecode from 'jwt-decode';
// import { loginUser, refreshToken } from '../services/userService';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);

//   const signIn = async (email, password) => {
//     const response = await loginUser(email, password);
//     if (response?.accessToken) {
//       setAccessToken(response.accessToken);
//       const decoded = jwtDecode(response.accessToken);
//       setUser({ ...decoded, role: decoded.usertype });
//       await AsyncStorage.setItem('accessToken', response.accessToken);
//       await AsyncStorage.setItem('refreshToken', response.refreshToken);
//     }
//     return response;
//   };

//   const signOut = async () => {
//     setUser(null);
//     setAccessToken(null);
//     await AsyncStorage.removeItem('accessToken');
//     await AsyncStorage.removeItem('refreshToken');
//   };

//   const loadUser = async () => {
//     const token = await AsyncStorage.getItem('accessToken');
//     if (token) {
//       setAccessToken(token);
//       const decoded = jwtDecode(token);
//       setUser({ ...decoded, role: decoded.usertype });
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, accessToken, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native'; // old built-in AsyncStorage (deprecated but works)
import jwtDecode from 'jwt-decode';
import { loginUser, refreshToken } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // User sign-in logic
  const signIn = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response?.accessToken) {
        setAccessToken(response.accessToken);

        const decoded = jwtDecode(response.accessToken);
        setUser({ ...decoded, role: decoded.usertype });

        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
      }
      return response;
    } catch (error) {
      console.error('Sign-in error:', error);
      return { error: 'Login failed. Please try again.' };
    }
  };

  // User sign-out logic
  const signOut = async () => {
    try {
      setUser(null);
      setAccessToken(null);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  // Load user session on app startup
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        const decoded = jwtDecode(token);
        setUser({ ...decoded, role: decoded.usertype });
      }
    } catch (error) {
      console.error('Error loading user session:', error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
