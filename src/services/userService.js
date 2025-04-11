import apiClient from "./apiClient";

// export const registerUser = async (userData) => {
//   try {
//     const response = await apiClient.post("/users/register", userData);
//     const { message, data } = response.data;
//     return {
//       message,
//       user: { fullName: data.fullName, email: data.email, id: data._id },
//     };
//   } catch (error) {
//     throw error.response?.data?.message || "Registration failed";
//   }
// };
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);
    
    console.log("API Response:", response); // Log the full response

    const { message, data } = response.data;

    return {
      message,
      user: { fullName: data.fullName, email: data.email, id: data._id },
    };
  } catch (error) {
    console.error("Error during registration:", error); 
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    const { message, token, userFound } = response.data;
    return {
      message,
      token,
      user: {
        fullName: userFound.fullName,
        email: userFound.email,
        id: userFound._id,
      },
    };
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
