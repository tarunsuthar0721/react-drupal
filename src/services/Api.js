import axios from "axios";

const API = axios.create({
  baseURL: "http://demobackend.local",  // Ensure this points to your real backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
        status: response.data.status ,
        roles: response.data.roles ,
        
      }));

      return {
        token: response.data.csrf_token,
        user: {
          uid: response.data.uid,
          name: response.data.name,
          email: response.data.email,
          profile_picture: response.data.profile_picture,
          status: response.data.status ,
          roles: response.data.roles ,
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

export const updateUser = async (formData) => {
  try { 
    const response = await API.post("/api/user-update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("User update response:", response.data);
    return response.data; // Return the response
  } catch (error) {
    console.error("Update User error:", error);
    throw new Error(error.response?.data?.message || "Update User failed");
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

export const getHeroBanner = async () => {
  try {
    const response = await API.get('/api/hero-banner');
    return response.data[0]; // Assuming the JSON is an array and we want the first item
  } catch (error) {
    console.error('Error fetching hero banner data:', error);
    throw error; // Rethrow the error for further handling in the component
  }
};


export const getTestimonials = async () => {
  try {
    const response = await API.get('/api/testimonial');
    return response.data;
  } catch (error) {
    console.error('Error fetching hero banner data:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await API.get("/api/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};

export const getProductByTitle = async (productTitle) => {
  try {
    const response = await API.get(`/api/product/${encodeURIComponent(productTitle)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products detail:", error);
    throw error; 
  }
};

export const getCategory = async () => {
  try {
    const response = await API.get("/api/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};