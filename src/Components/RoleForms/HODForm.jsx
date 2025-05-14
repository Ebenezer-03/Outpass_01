import React, { useState } from "react";

function HODForm() {
  const [hodId, setHodId] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HOD Login");
    console.log("HOD ID:", hodId);
    console.log("Department:", department);
    // Add validation logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>HOD Login</h4>
      <label>
        HOD ID:
        <input
          type="text"
          value={hodId}
          onChange={(e) => setHodId(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Department:
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default HODForm;
