import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AssignWard from "./pages/AssignWard"; // New route for assigning ward
import WardManagement from "./pages/WardManagement";

// Placeholder components for other login pages
const EmployeeLogin = () => <h2>Employee Login Page</h2>;
const HealthcareLogin = () => <h2>Healthcare Worker Login Page</h2>;
const RationLogin = () => <h2>Ration Officer Login Page</h2>;
const FamilyLogin = () => <h2>Family Member Login Page</h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/login/healthcare" element={<HealthcareLogin />} />
        <Route path="/login/ration" element={<RationLogin />} />
        <Route path="/login/family" element={<FamilyLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/assign-ward" element={<AssignWard />} />
        <Route path="/dashboard/wards" element={<WardManagement />} />
        
  
      </Routes>
    </Router>
  );
}

export default App;
