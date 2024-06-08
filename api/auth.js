import axios from "axios";

const API_KEY = '<<authkey>>';

export async function createUser(email, password) {
  const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  const url = signUpUrl + API_KEY;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true
  });
  return response.data;
}

export async function loginUser(email, password) {
  const signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  const url = signInUrl + API_KEY;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true
  });
  return response.data;
}