import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData, expensesByCategory, chartColors, currency }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
        <div className="w-full h-[300px] flex items-center justify-center">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Category Legend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Total Spent</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(expensesByCategory).map(
            ([category, total], index) => (
              <div key={category} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: chartColors[index] }}
                />
                <span>{category}</span>
                <span className="font-bold">
                  {currency.symbol}
                  {total.toLocaleString()}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
