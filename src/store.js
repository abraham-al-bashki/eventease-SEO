// NOTE: omstart med "npm run dev" rensar inte local storage :(

// Using localStorage for authentication token
const TOKEN_KEY = 'authToken';

// Set token in localStorage
function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

// Get token from localStorage
function getAuthToken() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
}

// Clear token from localStorage
function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  actions: {
    login(token) {
      setAuthToken(token);
    },
    logout() {
      clearAuthToken();
    },
    getIsLoggedIn() {
      return getAuthToken() !== null;
    },
    getUserId() {
      console.log('get aut', getAuthToken());
      return getAuthToken().id;
    },
    getUserinformation() {
      //ta ut data från local storage med "USER_INFO"
      if (getAuthToken() !== null) {
        return localStorage.getItem(TOKEN_KEY);
      }
    }
  }
});
