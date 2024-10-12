// src/api.ts

import axios, { AxiosError, AxiosResponse } from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const state = JSON.parse(localStorage.getItem("state") || "{}");

    if (state.userDetails) {
      // If a token exists, set it in the Authorization header
      config.headers["Authorization"] = state.userDetails?.token;
    }
    return config; // Return the modified config
  },
  (error) => {
    // Handle the error case
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Successful response (status code 2xx)
    return response; // You can modify or return the response directly
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.code === AxiosError.ECONNABORTED) {
      alert(
        "Using Hobby Servers, Please wait for a minute & then use the Application"
      );
    }

    // Handle errors globally (status codes 4xx, 5xx, or network errors)
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response:", error.response);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error setting up the request:", error.message);
    }

    // Optionally handle specific error statuses or log errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (401) - for example, redirect to login
      console.warn("Unauthorized access - redirecting to login...");
    }

    // Reject the error to continue with the catch block in the request call
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

export const registerUser = async (
  fullName: string,
  email: string,
  phoneNumber: string
) => {
  try {
    return await api.post("/users", { fullName, email, phoneNumber }); // Return the response data directly
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
  return await api.get(`/items/month/${startDate}`); // Return the response directly
};
