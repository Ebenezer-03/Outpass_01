import React, { useState } from "react";

function StudentForm() {
  const [regNo, setRegNo] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Login:", regNo, dob);
    // Add validation logic here
  };

  return (
    <div>
      <h4>Student Login</h4>
    <form onSubmit={handleSubmit}>
      <label>
        Register Number:
        <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
      </label><br></br>
      <label>
        Date of Birth:
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </label><br></br>
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default StudentForm;
