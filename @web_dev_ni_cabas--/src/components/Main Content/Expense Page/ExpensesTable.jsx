import React, { useEffect, useState } from "react";
import { fetchExpenses } from "../../../store/expensesApi"; // Adjust import path as needed
import { fetchBudgets } from "../../../store/budgetApi"; // Adjust import path as needed

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch both budgets and expenses
      const budgetData = await fetchBudgets(); // Fetch budgets
      setBudgets(budgetData); // Set the budgets state

      const expensesData = await fetchExpenses(); // Fetch expenses
      setExpenses(expensesData); // Set the expenses state
    } catch (err) {
      setError(err.message); // Handle errors if the request fails
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2 pl-16">Expenses</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Budget Category</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-96">
            {expenses.map((expense, index) => {
              // Find the budget category for the expense based on categoryId
              const budget = budgets.find(
                (budget) => budget.id === expense.categoryId
              );

              return (
                <tr
                  key={expense.id} // Using expense ID as key
                  className={index % 2 === 1 ? "bg-blue-600 text-white" : ""}
                >
                  <td className="py-2 pl-10 font-medium">{expense.expense_name}</td>
                  <td className="py-2 font-medium">₱{expense.amount.toFixed(2)}</td>
                  <td className="py-2 font-medium">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        index % 2 === 1
                          ? "bg-white text-blue-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {budget?.budget_name || "No Category"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesTable;
