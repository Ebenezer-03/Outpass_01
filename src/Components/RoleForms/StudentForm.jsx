import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const [regNo, setRegNo] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    navigate("/student-dashboard");
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
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default StudentForm;
