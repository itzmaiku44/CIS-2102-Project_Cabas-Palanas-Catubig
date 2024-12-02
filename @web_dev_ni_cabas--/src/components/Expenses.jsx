import React from "react";

const Expenses = ({ expenses }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold mb-3">All Expenses</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={expense.id}
                className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
              >
                <td className="px-4 py-2 border">{expense.category}</td>
                <td className="px-4 py-2 border">₱{expense.amount}</td>
                <td className="px-4 py-2 border">{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;