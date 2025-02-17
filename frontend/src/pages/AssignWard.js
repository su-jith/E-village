import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AssignWard.css";

const AssignWard = () => {
  const [employees, setEmployees] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch employees from backend
  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/admin/employees", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data.employees || []))
      .catch((err) => console.error("Error fetching employees:", err));
  };

  // Fetch wards from backend
  const fetchWards = () => {
    fetch("http://localhost:5000/api/admin/ward", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWards(data.wards || []))
      .catch((err) => console.error("Error fetching wards:", err));
  };

  useEffect(() => {
    fetchEmployees();
    fetchWards();
  }, [token]);

  // For assigning a ward, we want to show all wards from the database.
  // The backend will enforce that no duplicate ward assignment occurs.
  // (Optionally, you could filter here if needed.)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedWard) {
      setMessage("Please select both an employee and a ward.");
      return;
    }
    const payload = { employeeId: selectedEmployee, ward: selectedWard };
    console.log("Payload:", payload);  // Log payload
  
    try {
      const res = await fetch("http://localhost:5000/api/admin/assign-ward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log("Backend response:", data);  // Log backend response
      if (res.ok) {
        setMessage(data.message || "Ward assigned successfully!");
        setSelectedEmployee("");
        setSelectedWard("");
        fetchEmployees();
      } else {
        setMessage(data.message || "Error assigning ward. Please try again.");
      }
    } catch (error) {
      console.error("Error assigning ward:", error);
      setMessage("Error assigning ward. Please try again.");
    }
  };

  const handleDeleteAssignment = async (employeeId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/assign-ward/${employeeId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Assignment deleted successfully!");
        fetchEmployees();
      } else {
        setMessage(data.message || "Error deleting assignment.");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      setMessage("Error deleting assignment. Please try again.");
    }
  };

  return (
    <div className="assign-ward-container">
      <h2>Assign Ward to Employee</h2>
      <form className="assign-ward-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee">Select Employee:</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">-- Choose an employee --</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name ? emp.name : emp.email}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ward">Select Ward:</label>
          <select
            id="ward"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            required
          >
            <option value="">-- Choose a ward --</option>
            {wards.map(w => (
              <option key={w._id} value={w.wardNumber}>
                Ward {w.wardNumber} ({w.wardMember})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Assign Ward
        </button>
      </form>
      {message && <p className="message">{message}</p>}

      <h2>Employee Ward Assignments</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Assigned Ward</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name ? emp.name : "N/A"}</td>
              <td>{emp.email}</td>
              <td>{emp.ward ? `Ward ${emp.ward}` : "Not Assigned"}</td>
              <td>
                {emp.ward && (
                  <button className="action-btn delete" onClick={() => handleDeleteAssignment(emp._id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignWard;
