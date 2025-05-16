import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import "./App.css";
import IncomeRecPage from "./pages/IncomeRecPage";
import ExpenseRecPage from "./pages/ExpenseRecPage";

function App() {
  return (
    <Router>
      <div className="main-app" style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div className="app-routes" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/add-income" element={<IncomePage />} />
            <Route path="/add-expense" element={<ExpensePage />} />
            <Route path="/income-records" element={<IncomeRecPage />} />
            <Route path="/expense-records" element={<ExpenseRecPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
