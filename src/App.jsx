import React, { useState } from "react";
import RoleSelector from "./components/RoleSelector";
import ValidateUser from "./components/ValidateUser";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import StudentDashboard from "./components/Dashboard/StudentDashboard"; // Import the StudentDashboard component

function App() {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    // <div className="LoginPage">
    //   <h1 style={{ textAlign: "center" }}>OUTPASS GENERATION SYSTEM</h1>
    //   <h3>Login Page</h3>
    //   <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
    //   <p>Selected Role: {selectedRole || "None"}</p>
    //   <ValidateUser role={selectedRole} />
    //   <BrowserRouter>
    //   <Routes>
    //     <Route path = '/RoleSelection' element = {<RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />}/>
    //     <Route path = '/Validate' element = {<ValidateUser role={selectedRole} />}/>
    //   </Routes>
    //   </BrowserRouter>
    // </div>
    <div>
      <StudentDashboard />
    </div>
  );
  
}

export default App;
