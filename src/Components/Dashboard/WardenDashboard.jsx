import React, { useState, useEffect } from "react";
import "./Warden.css";
import { FaCheck, FaTimes, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const WardenDashboard = () => {
  const [tab, setTab] = useState("pending");
  const [requests, setRequests] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });
  useEffect(() => {
    const fetchStudentRequests = async () => {
      try {
        setRequests(prev => ({ ...prev, pending: [] }));
      } catch (error) {
        console.error('Error fetching student requests:', error);
      }
    };

    fetchStudentRequests();
  }, []);

  const handleRequest = async (requestId, action) => {
    const request = requests.pending.find(req => req.requestId === requestId);
    if (!request) return;

    try {
      setRequests(prev => ({
        pending: prev.pending.filter(req => req.requestId !== requestId),
        approved: action === 'approve' ? [...prev.approved, { ...request, actionTimestamp: new Date().toLocaleString() }] : prev.approved,
        rejected: action === 'reject' ? [...prev.rejected, { ...request, actionTimestamp: new Date().toLocaleString() }] : prev.rejected,
      }));
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: <span className="status-badge status-pending"><FaClock /> Pending</span>,
      approved: <span className="status-badge status-approved"><FaCheckCircle /> Approved</span>,
      rejected: <span className="status-badge status-rejected"><FaTimesCircle /> Rejected</span>
    };
    return badges[status];
  };

  const renderTable = (data, statusLabel) => (
    <div className="table-container">
      <table className="warden-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Room No</th>
            <th>Out Date & Time</th>
            <th>Return Date & Time</th>
            <th>Reason</th>
            <th>Status</th>
            {tab === "pending" && <th>Actions</th>}
            {(tab === "approved" || tab === "rejected") && <th>{statusLabel}</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={tab === "pending" ? 9 : 8} style={{ textAlign: 'center' }}>
                No {tab} requests found
              </td>
            </tr>
          ) : (
            data.map((req, idx) => (
              <tr key={idx}>
                <td>{req.requestId}</td>
                <td>{req.student}</td>
                <td>{req.studentId}</td>
                <td>{req.roomNo}</td>
                <td>{new Date(req.outDate).toLocaleString()}</td>
                <td>{new Date(req.returnDate).toLocaleString()}</td>
                <td>{req.reason}</td>
                <td>{getStatusBadge(tab)}</td>
                {tab === "pending" && (
                  <td>
                    <button 
                      className="approve-button"
                      onClick={() => handleRequest(req.requestId, 'approve')}
                    >
                      <FaCheck /> Approve
                    </button>
                    <button 
                      className="reject-button"
                      onClick={() => handleRequest(req.requestId, 'reject')}
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                )}
                {(tab === "approved" || tab === "rejected") && (
                  <td>{req.actionTimestamp}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="warden-dashboard">
      <h2>Warden Dashboard</h2>
      <p>Review and manage student outpass requests</p>

      <div className="tab-buttons">
        {[
          { id: "pending", icon: <FaClock />, label: "Pending" },
          { id: "approved", icon: <FaCheckCircle />, label: "Approved" },
          { id: "rejected", icon: <FaTimesCircle />, label: "Rejected" }
        ].map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={tab === id ? "active" : ""}
          >
            {icon} {label} Requests
          </button>
        ))}
      </div>

      <div>
        {renderTable(
          requests[tab],
          `${tab.charAt(0).toUpperCase() + tab.slice(1)} On`
        )}
      </div>
    </div>
  );
};

export default WardenDashboard;