import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ expensesData }) => {
  const getChartData = () => {
    const labels = expensesData.map((expense) => expense.date);
    const expenseValues = expensesData.map((expense) => expense.amount);

    return {
      labels,
      datasets: [
        {
          label: "Expense Over Time",
          data: expenseValues,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div>
      <h3>Expense Chart (Spikes in Expenses)</h3>
      <Line data={getChartData()} options={chartOptions} />
    </div>
  );
};

export default ExpenseChart;
