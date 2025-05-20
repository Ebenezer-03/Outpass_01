import React, { useState } from 'react';
import './Class.css';

const ClassAdvisorDashboard = () => {
  const [tab, setTab] = useState('pending');
  const [viewDetails, setViewDetails] = useState(null);
  const [advisorInfo] = useState({
    name: "Dr. Smith",
    department: "Computer Science",
    classHandled: "CS 3rd Year"
  });

  // Mock data - replace with actual API calls later
  const [outpassRequests, setOutpassRequests] = useState({
    pending: [
      {
        id: 1,
        studentName: "John Doe",
        rollNumber: "CS2023001",
        reason: "Family Emergency",
        fromDate: "2024-03-20",
        toDate: "2024-03-22",
        status: "pending",
        timestamp: "2024-03-19 10:30 AM"
      },
      {
        id: 2,
        studentName: "Jane Smith",
        rollNumber: "CS2023002",
        reason: "Medical Appointment",
        fromDate: "2024-03-21",
        toDate: "2024-03-21",
        status: "pending",
        timestamp: "2024-03-19 11:45 AM"
      }
    ],
    approved: [
      {
        id: 3,
        studentName: "Mike Johnson",
        rollNumber: "CS2023003",
        reason: "Interview",
        fromDate: "2024-03-18",
        toDate: "2024-03-18",
        status: "approved",
        timestamp: "2024-03-17 09:15 AM"
      }
    ],
    rejected: [
      {
        id: 4,
        studentName: "Sarah Wilson",
        rollNumber: "CS2023004",
        reason: "Personal Work",
        fromDate: "2024-03-15",
        toDate: "2024-03-16",
        status: "rejected",
        timestamp: "2024-03-14 02:30 PM"
      }
    ]
  });

  const handleApprove = (id) => {
    const request = outpassRequests.pending.find(req => req.id === id);
    if (request) {
      setOutpassRequests(prev => ({
        ...prev,
        pending: prev.pending.filter(req => req.id !== id),
        approved: [...prev.approved, { ...request, status: 'approved' }]
      }));
    }
  };

  const handleReject = (id) => {
    const request = outpassRequests.pending.find(req => req.id === id);
    if (request) {
      setOutpassRequests(prev => ({
        ...prev,
        pending: prev.pending.filter(req => req.id !== id),
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
            <th>Roll Number</th>
            <th>Reason</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Submitted On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => (
            <tr key={request.id}>
              <td>{request.studentName}</td>
              <td>{request.rollNumber}</td>
              <td>{request.reason}</td>
              <td>{request.fromDate}</td>
              <td>{request.toDate}</td>
              <td>{request.timestamp}</td>
              <td>
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(request.id)}
                  style={{ display: tab === 'pending' ? 'inline-block' : 'none' }}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(request.id)}
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
              <div className="info-value">{viewDetails.rollNumber}</div>
            </div>

            <div className="info-group">
              <div className="info-label">Reason for Outpass</div>
              <div className="info-value">{viewDetails.reason}</div>
            </div>

            <div className="info-group">
              <div className="info-label">Duration</div>
              <div className="info-value">From: {viewDetails.fromDate}</div>
              <div className="info-value">To: {viewDetails.toDate}</div>
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
                      handleApprove(viewDetails.id);
                      setViewDetails(null);
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    Approve Request
                  </button>
                  <button 
                    className="reject-btn"
                    onClick={() => {
                      handleReject(viewDetails.id);
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
