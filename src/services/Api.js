import axios from "axios";

const API = axios.create({
  baseURL: "http://demobackend.local",  // Ensure this points to your real backend
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email, password) => {
  try {
    // Send login request with email and password
    const response = await API.post("/api/login", {
      mail: email,  // Correct field name (mail instead of email)
      pass: password,
    });

    console.log("Login Response:", response); // Log the full response for debugging

    // Check if login is successful
    if (response.data && response.data.message === "Login successful") {
      // Store the CSRF token in localStorage after successful login
      localStorage.setItem("csrf_token", response.data.csrf_token);
      localStorage.setItem("user", JSON.stringify({ 
        uid: response.data.uid ,
        name: response.data.name ,
        email: response.data.email ,
        profile_picture: response.data.profile_picture ,
        // picture: response.data.picture ,
      }));

      return {
        token: response.data.csrf_token,
        user: {
          uid: response.data.uid,
          name: response.data.name,
          email: response.data.email,
          profile_picture: response.data.profile_picture,
        },
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Function to handle user logout with CSRF token
export const logoutUser = async () => {
  try {
    const csrfToken = localStorage.getItem("csrf_token");  // Get CSRF token from localStorage

    if (!csrfToken) {
      throw new Error("CSRF token missing");  // Error handling if CSRF token is missing
    }

    // Send the logout request with CSRF token in the header
    const response = await API.post("/api/logout", {}, {
      headers: {
        "X-CSRF-Token": csrfToken,  // Include CSRF token in the request header
      },
    });

    console.log("Logout Response:", response);
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error("Logout API error:", error);
    throw new Error(error.response?.data?.error || "Logout failed");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/api/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "An error occurred during registration."
    );
  }
};