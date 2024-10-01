// src/api.ts

import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // If a token exists, set it in the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle the error case
    return Promise.reject(error);
  }
);

// Function to sign in with phone number
export const signIn = async (phoneNumber: string) => {
  try {
    const response = await api.post("/users/sign-in", { phoneNumber });
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Function to verify OTP
export const verifyOtp = async (otp: string, phoneNumber: string) => {
  try {
    return await api.post("/users/verify-otp", { otp, phoneNumber }); // Return the response data directly
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

type expense = {
  category: string;
  amount: number;
  type?: "expense" | "income" | string;
  date: string;
  time: string;
  paidTo?: string;
};

// Function to add an expense
export const addExpense = async (expenseData: expense) => {
  try {
    const response = await api.post("/items", expenseData);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Function to edit an expense
export const editExpense = async (
  id: string,
  expenseData: Partial<expense>
) => {
  try {
    return await api.put(`/items/${id}`, expenseData); // Return the response directly
  } catch (error) {
    console.error("Error editing expense:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getDayResponse = async (date: string) => {
  try {
    return await api.get(`/items/day/${date}`); // Return the response directly
  } catch (error) {
    console.error("Error editing expense:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getWeekResponse = async (startDate: string) => {
  try {
    return await api.get(`/items/week/${startDate}`); // Return the response directly
  } catch (error) {
    console.error("Error editing expense:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getMonthRespnose = async (startDate: string) => {
  try {
    return await api.get(`/items/month/${startDate}`); // Return the response directly
  } catch (error) {
    throw error;
  }
};
