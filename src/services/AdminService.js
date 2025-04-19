import apiClient from "./apiClient";

// Create a new product
export const createProduct = async (formData) => {
  try {
    const response = await apiClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Product creation failed";
  }
};

// Fetch categories for dropdown
export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.categories;
  } catch (error) {
    throw "Failed to fetch categories " + error;
  }
};

// Fetch brands for dropdown
export const fetchBrands = async () => {
  try {
    const response = await apiClient.get("/brands");
    return response.data.brands;
  } catch (error) {
    throw "Failed to fetch brands " + error;
  }
};

// Fetch colors for dropdown
export const fetchColors = async () => {
  try {
    const response = await apiClient.get("/colors");
    return response.data.colors;
  } catch (error) {
    throw "Failed to fetch colors " + error;
  }
};

// Fetch list of users (for statistics)
export const fetchUsersList = async () => {
  try {
    const response = await apiClient.get("/users/list");
    return response.data.data || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch users list";
  }
};

// Fetch list of products (for statistics)
export const fetchProductsList = async () => {
  try {
    const response = await apiClient.get("/products/");
    return response.data.products || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch products list";
  }
};
