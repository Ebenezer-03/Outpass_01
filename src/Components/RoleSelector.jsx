import React from "react";

function RoleSelector({ selectedRole, setSelectedRole }) {
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="user-role">
      <h4>Select Your Role</h4>
      {["Student", "Class Advisor", "HOD", "Warden"].map((role) => (
        <label key={role} style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value={role}
            checked={selectedRole === role}
            onChange={handleRoleChange}
          />
          {role}
          
        </label>
      ))}
    </div>
  );
}

export default RoleSelector;
