import React, { useState, useEffect } from "react";
import "./Student.css";

const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `REQ-${timestamp}-${random}`;
};

const StudentDashboard = () => {
  const [tab, setTab] = useState("pending");
  const [requests, setRequests] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });

  const [formData, setFormData] = useState({
    Reason: "",
    outDate: "",
    returnDate: "",
  });
  const [studentName, setStudentName] = useState("John Doe");
  const [studentClass, setStudentClass] = useState("10th Grade");
  const [showForm, setShowForm] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addRequest = () => {
    const newRequest = {
      ...formData,
      studentName,
      studentClass,
      requestId: generateUniqueId(),
      timestamp: new Date().toLocaleString(),
    };
    setRequests((prev) => ({
      ...prev,
      [tab]: [...prev[tab], newRequest],
    }));
    setFormData({ Reason: "", outDate: "", returnDate: "" });
    setShowForm(false);
  };
  const deleteRequest = (requestId) => {
  setRequests((prev) => ({
    ...prev,
    [tab]: prev[tab].filter((req) => req.requestId !== requestId),
  }));
};


  const renderTable = (data, statusLabel) => (
    <div className="table-container" style={{ opacity: viewDetails ? 0.2 : 1 }}>
      <table className="student-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Reason</th>
            <th>Out Date & Time</th>
            <th>Return Date & Time</th>
            <th>{statusLabel}</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req, idx) => (
            <tr key={idx}>
              <td>{req.requestId}</td>
              <td>{req.Reason}</td>
              <td>{req.outDate}</td>
              <td>{req.returnDate}</td>
              <td>{req.timestamp}</td>
              <td>
                <button
                  onClick={() => setViewDetails(req)}
                  className="view-btn"
                >
                  View
                </button>
                <button
                  onClick={() => deleteRequest(req.requestId)}
                  className="delete-button"
                  style={{ marginLeft: "10px", backgroundColor: "#e74c3c", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  

  return (
    <div className="student-dashboard">
      <div className="header-box">
        <h1 className="dashboard-title">Outpass Generation System</h1>
        <h2 className="dashboard-subtitle">Student Dashboard</h2>
        <p className="dashboard-desc">Generate and manage your outpasses using the controls below.</p>
        <div style={{
          marginTop: "10px",
          padding: "15px",
          backgroundColor: "#e0f7fa",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#006064"
        }}>
          Name: {studentName} | Class: {studentClass}
        </div>
      </div>

      <div className="top-bar">
        <div className="tab-buttons">
          {['pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setTab(status)}
              className={`tab-button ${tab === status ? "active" : ""}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        {tab === "pending" && (
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "➕ New Outpass"}
        </button>
        )}
      </div>

      <div className="main-content">
        {showForm && (
          <div className="form-section">
            <h3>Add {tab.charAt(0).toUpperCase() + tab.slice(1)} Request</h3>
            <input
              type="text"
              name="Reason"
              placeholder="Reason for Outpass"
              value={formData.Reason}
              onChange={handleInputChange}
            />
            <input
              type="datetime-local"
              name="outDate"
              value={formData.outDate}
              onChange={handleInputChange}
            />
            <input
              type="datetime-local"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
            />
            <button className="submit-button" onClick={addRequest}>
              Submit Request
            </button>
          </div>
        )}

        <div className="table-wrapper">
          {renderTable(requests[tab], `${tab.charAt(0).toUpperCase() + tab.slice(1)} On`)}
        </div>

        {viewDetails && (
          <>
            <div className="modal-overlay" onClick={() => setViewDetails(null)} />
            <div className="details-modal">
              <h2>Request Details</h2>

              {/* Approval Status Stepper */}
              <div className="approval-stepper">
                {[
                  { label: 'Submitted', icon: <span style={{fontSize:'20px'}}>&#10003;</span> },
                  { label: 'Class Advisor', icon: <span style={{fontSize:'20px'}}>&#9203;</span> },
                  { label: 'Dept. HOD', icon: <span style={{fontSize:'20px'}}>&#9203;</span> },
                  { label: 'Warden', icon: <span style={{fontSize:'20px'}}>&#9203;</span> }
                ].map((step, idx) => {
                  // Determine current step based on status
                  // 0: Submitted, 1: Class Advisor, 2: HOD, 3: Warden
                  let currentStep = 0;
                  if (tab === 'pending') currentStep = 1;
                  if (tab === 'approved') currentStep = 2;
                  if (tab === 'rejected') currentStep = 1; // treat as stopped at advisor
                  let stepClass = '';
                  if (idx < currentStep) stepClass = 'completed';
                  else if (idx === currentStep) stepClass = 'current';
                  return (
                    <div className={`step ${stepClass}`} key={step.label}>
                      <div className="step-icon">{step.icon}</div>
                      <div className="step-label">{step.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="info-group">
                <div className="info-label">Student Information</div>
                <div className="info-value">{viewDetails.studentName}</div>
                <div className="info-value">{viewDetails.studentClass}</div>
              </div>

              <div className="info-group">
                <div className="info-label">Reason for Outpass</div>
                <div className="info-value">{viewDetails.Reason}</div>
              </div>

              <div className="info-group">
                <div className="info-label">Duration</div>
                <div className="info-value">Out: {viewDetails.outDate}</div>
                <div className="info-value">Return: {viewDetails.returnDate}</div>
              </div>

              <div className="info-group">
                <div className="info-label">Request Information</div>
                <div className="info-value">Submitted On: {viewDetails.timestamp}</div>
                <div className="info-value">
                  Status: 
                  <span className={`status-badge status-${tab}`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="close-btn"
                  onClick={() => setViewDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;