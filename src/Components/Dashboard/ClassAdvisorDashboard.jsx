import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Class.css';

const STORAGE_KEY = "student_outpass_requests";

const ClassAdvisorDashboard = () => {
  const [tab, setTab] = useState('pending');
  const [viewDetails, setViewDetails] = useState(null);
  const [advisorInfo] = useState({
    name: "Dr. Smith",
    department: "Computer Science",
    classHandled: "CS 3rd Year"
  });
  const [outpassRequests, setOutpassRequests] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });
  const navigate = useNavigate();

  // Function to load requests from localStorage
  const loadRequests = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setOutpassRequests(JSON.parse(stored));
    }
  };

  // Load requests from localStorage on mount and when window regains focus
  useEffect(() => {
    loadRequests();
    window.addEventListener('focus', loadRequests);
    return () => window.removeEventListener('focus', loadRequests);
  }, []);

  // Save requests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(outpassRequests));
  }, [outpassRequests]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleApprove = (requestId) => {
    const request = outpassRequests.pending.find(req => req.requestId === requestId);
    if (request) {
      setOutpassRequests(prev => ({
        ...prev,
        pending: prev.pending.filter(req => req.requestId !== requestId),
        approved: [...prev.approved, { ...request, status: 'approved' }]
      }));
    }
  };

  const handleReject = (requestId) => {
    const request = outpassRequests.pending.find(req => req.requestId === requestId);
    if (request) {
      setOutpassRequests(prev => ({
        ...prev,
        pending: prev.pending.filter(req => req.requestId !== requestId),
        rejected: [...prev.rejected, { ...request, status: 'rejected' }]
      }));
    }
  };

  const renderTable = (data) => (
    <div className="table-container" style={{ opacity: viewDetails ? 0.2 : 1 }}>
      <table className="outpass-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Reason</th>
            <th>Out Date</th>
            <th>Return Date</th>
            <th>Submitted On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => (
            <tr key={request.requestId}>
              <td>{request.studentName}</td>
              <td>{request.studentClass}</td>
              <td>{request.Reason}</td>
              <td>{request.outDate}</td>
              <td>{request.returnDate}</td>
              <td>{request.timestamp}</td>
              <td>
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(request.requestId)}
                  style={{ display: tab === 'pending' ? 'inline-block' : 'none' }}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(request.requestId)}
                  style={{ display: tab === 'pending' ? 'inline-block' : 'none' }}
                >
                  Reject
                </button>
                <button
                  onClick={() => setViewDetails(request)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="class-dashboard">
      <button className="logout-btn" onClick={handleLogout} title="Logout">
        Logout
      </button>
      <button className="logout-btn" style={{top: 70, right: 32, background: '#e0f7fa', color: '#388e3c'}} onClick={loadRequests} title="Reload">
        Reload
      </button>
      <div className="header-box">
        <h1 className="dashboard-title">Outpass Generation System</h1>
        <h2 className="dashboard-subtitle">Class Advisor Dashboard</h2>
        <p className="dashboard-desc">Review and manage outpass requests from your students.</p>
        <div style={{
          marginTop: "10px",
          padding: "15px",
          backgroundColor: "#e0f7fa",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#006064"
        }}>
          Name: {advisorInfo.name} | Department: {advisorInfo.department} | Class: {advisorInfo.classHandled}
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
      </div>

      <div className="table-wrapper">
        {renderTable(outpassRequests[tab])}
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
                if (viewDetails.status === 'pending') currentStep = 1;
                if (viewDetails.status === 'approved') currentStep = 2;
                if (viewDetails.status === 'rejected') currentStep = 1; // treat as stopped at advisor
                // You can expand this logic for more granular status
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
              <div className="info-value">Out Date: {viewDetails.outDate}</div>
              <div className="info-value">Return Date: {viewDetails.returnDate}</div>
            </div>

            <div className="info-group">
              <div className="info-label">Request Information</div>
              <div className="info-value">Submitted On: {viewDetails.timestamp}</div>
              <div className="info-value">
                Status: 
                <span className={`status-badge status-${viewDetails.status}`}>
                  {viewDetails.status.charAt(0).toUpperCase() + viewDetails.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              {viewDetails.status === 'pending' && (
                <>
                  <button 
                    className="approve-btn"
                    onClick={() => {
                      handleApprove(viewDetails.requestId);
                      setViewDetails(null);
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    Approve Request
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => {
                      handleReject(viewDetails.requestId);
                      setViewDetails(null);
                    }}
                  >
                    Reject Request
                  </button>
                </>
              )}
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
  );
};

export default ClassAdvisorDashboard;
