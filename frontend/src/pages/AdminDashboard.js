import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-cards">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin</p>
      </header>
      <div className="cards-container">
        <Link to="/dashboard/overview" className="card">
          <h2>Dashboard Overview</h2>
          <p>View key statistics and recent activities.</p>
        </Link>
        <Link to="/dashboard/families" className="card">
          <h2>Family Management</h2>
          <p>Manage and view family records.</p>
        </Link>
        <Link to="/dashboard/users" className="card">
          <h2>User Management</h2>
          <p>Manage user accounts and roles.</p>
        </Link>
        <Link to="/dashboard/assign-ward" className="card">
          <h2>Assign Ward</h2>
          <p>Assign wards to employees for data collection.</p>
        </Link>
        <Link to="/dashboard/wards" className="card">
          <h2>User & Ward Management</h2>
          <p>Manage employee assignments and ward configurations.</p>
        </Link>
        <Link to="/dashboard/settings" className="card">
          <h2>Settings</h2>
          <p>Configure system settings and preferences.</p>
        </Link>
        <Link to="/dashboard/notifications" className="card">
          <h2>Notifications</h2>
          <p>View system notifications and alerts.</p>
        </Link>
        <Link to="/logout" className="card">
          <h2>Logout</h2>
          <p>Sign out of the admin portal.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
