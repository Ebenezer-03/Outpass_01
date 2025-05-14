import React, { useState } from "react";

function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <div className="user-role">
        <h4>Select Role:</h4>
        <label>
          <input
            type="radio"
            value="Student"
            checked={selectedRole === "Student"}
            onChange={handleRoleChange}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            value="Class Advisor"
            checked={selectedRole === "Class Advisor"}
            onChange={handleRoleChange}
          />
          Class Advisor
        </label>
        <label>
          <input
            type="radio"
            value="HOD"
            checked={selectedRole === "HOD"}
            onChange={handleRoleChange}
          />
          HOD
        </label>
        <label>
          <input
            type="radio"
            value="Warden"
            checked={selectedRole === "Warden"}
            onChange={handleRoleChange}
          />
          Warden
        </label>
      </div>

      <p>Selected Role: {selectedRole || "None"}</p>
    </div>
  );
}

export default RoleSelector;
