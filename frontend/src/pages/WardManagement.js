import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WardManagement.css";

const WardManagement = () => {
  const [wards, setWards] = useState([]);
  const [wardNumber, setWardNumber] = useState("");
  const [numberOfHouses, setNumberOfHouses] = useState("");
  const [wardMember, setWardMember] = useState("");
  const [selectedWardId, setSelectedWardId] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch existing wards from the backend
  const fetchWards = () => {
    fetch("http://localhost:5000/api/admin/ward", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards || []);
      })
      .catch((err) => console.error("Error fetching wards:", err));
  };

  useEffect(() => {
    fetchWards();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedHouses = parseInt(numberOfHouses, 10);
    if (!wardNumber || isNaN(parsedHouses) || !wardMember) {
      setMessage("Please fill in all fields with valid values.");
      return;
    }
    const payload = {
      wardNumber,
      numberOfHouses: parsedHouses,
      wardMember,
    };

    try {
      let url = "http://localhost:5000/api/admin/ward";
      let method = "POST";
      if (selectedWardId) {
        url = `http://localhost:5000/api/admin/ward/${selectedWardId}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Ward saved successfully!");
        setSelectedWardId(null);
        setWardNumber("");
        setNumberOfHouses("");
        setWardMember("");
        fetchWards();
      } else {
        setMessage(data.message || "Error saving ward. Please try again.");
      }
    } catch (error) {
      console.error("Error saving ward:", error);
      setMessage("Error saving ward. Please try again.");
    }
  };

  const handleEdit = (wardData) => {
    setSelectedWardId(wardData._id);
    setWardNumber(wardData.wardNumber);
    setNumberOfHouses(wardData.numberOfHouses);
    setWardMember(wardData.wardMember);
    setMessage("");
  };

  const handleDelete = async (wardId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/ward/${wardId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Ward deleted successfully!");
        if (selectedWardId === wardId) {
          setSelectedWardId(null);
          setWardNumber("");
          setNumberOfHouses("");
          setWardMember("");
        }
        fetchWards();
      } else {
        setMessage(data.message || "Failed to delete ward.");
      }
    } catch (error) {
      console.error("Error deleting ward:", error);
      setMessage("Error deleting ward. Please try again.");
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/assign-ward">Assign Ward</Link>
          </li>
          <li>
            <Link to="/dashboard/wards">Ward Management</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>

      <div className="ward-management-container">
        <h2>Ward Management</h2>
        <form className="ward-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="wardNumber">Ward Number:</label>
            <input
              type="number"
              id="wardNumber"
              value={wardNumber}
              onChange={(e) => setWardNumber(e.target.value)}
              placeholder="Enter ward number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfHouses">Number of Houses:</label>
            <input
              type="number"
              id="numberOfHouses"
              value={numberOfHouses}
              onChange={(e) => setNumberOfHouses(e.target.value)}
              placeholder="Enter number of houses"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wardMember">Ward Member Name:</label>
            <input
              type="text"
              id="wardMember"
              value={wardMember}
              onChange={(e) => setWardMember(e.target.value)}
              placeholder="Enter ward member's name"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {selectedWardId ? "Update Ward" : "Add Ward"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}

        <h2>Existing Wards</h2>
        <table className="ward-table">
          <thead>
            <tr>
              <th>Ward Number</th>
              <th>No. of Houses</th>
              <th>Ward Member</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wards.map((w) => (
              <tr key={w._id}>
                <td>{w.wardNumber}</td>
                <td>{w.numberOfHouses}</td>
                <td>{w.wardMember}</td>
                <td>
                  <button className="action-btn" onClick={() => handleEdit(w)}>
                    Change
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(w._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardManagement;
