import useAuthStore from "./authStore";

const API_URL = "http://localhost:3000";

// Fetch Expenses
export const fetchExpenses = async () => {
  try {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await fetch(`${API_URL}/expenses`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    return await response.json();
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// Update an expense
export const updateExpense = async (id, expense) => {
  try {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Log the request details for debugging
    console.log("Update expense request:", {
      id,
      expense,
      url: `${API_URL}/expenses/${id}`,
    });

    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
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

// Delete an expense
export const deleteExpense = async (id) => {
  try {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Log the request details for debugging
    console.log("Delete expense request:", {
      id,
      url: `${API_URL}/expenses/${id}`,
    });

    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    // Log the response for debugging
    console.log("Delete response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete expense");
    }

    // Assuming the API returns the deleted expense or a success message
    return await response.json();
  } catch (err) {
    console.error("Delete expense error:", err.message);
    throw err;
  }
};

// Add a new expense
export const addExpense = async (expense) => {
  try {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Log the request details for debugging
    console.log("Add expense request:", {
      expense,
      url: `${API_URL}/expenses`,
    });

    const response = await fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
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
