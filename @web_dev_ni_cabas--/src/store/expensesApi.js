import useAuthStore from "./authStore";

// Function to fetch the expenses data from the backend with the token
export const fetchExpenses = async () => {
  try {
    // Get the token from Zustand store
    const { token } = useAuthStore.getState();

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Send the request with the token in the Authorization header
    const response = await fetch("http://localhost:3000/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load expenses data.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err.message);
  }
};
