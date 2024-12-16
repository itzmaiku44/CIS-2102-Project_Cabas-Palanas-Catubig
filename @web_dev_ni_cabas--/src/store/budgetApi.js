import useAuthStore from "./authStore";

const API_URL = "http://localhost:3000";

// Function to fetch the budget data from the backend with the token
export const fetchBudgets = async () => {
  try {
    // Get the token from Zustand store
    const { token } = useAuthStore.getState();

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Send the request with the token in the Authorization header
    const response = await fetch(`${API_URL}/budgets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load budget data.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw new Error(err.message);
  }
};

// Add a new budget
export const addBudget = async (budget) => {
  try {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Log the request details for debugging
    console.log("Add budget request:", {
      budget,
      url: `${API_URL}/budgets`,
    });

    const response = await fetch(`${API_URL}/budgets`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    });

    // Log the response for debugging
    console.log("Add response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add expense");
    }

    return await response.json();
  } catch (err) {
    console.error("Add expense error:", err.message);
    throw err;
  }
};

// Update an expense
export const updateBudget = async (id, budget) => {
  try {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Log the request details for debugging
    console.log("Update budget request:", {
      id,
      budget,
      url: `${API_URL}/budgets/${id}`,
    });

    const response = await fetch(`${API_URL}/budgets/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    });

    // Log the response for debugging
    console.log("Update response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update expense");
    }

    return await response.json();
  } catch (err) {
    console.error("Update expense error:", err.message);
    throw err;
  }
};
