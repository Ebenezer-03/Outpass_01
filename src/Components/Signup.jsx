import React, { useState } from 'react';
import ValidateUser from './ValidateUser';
import "./signup.css";
import RoleSelector from './RoleSelector';

function Signup() {
    const [username, setUsername] = useState("");

    const handleRoleChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div className='signup'>
            <h2>Outpass Management System - Sign Up</h2>
            <div className='role'>
                <label htmlFor="role">Select Role:</label>
                <select id="role" value={username} onChange={handleRoleChange}>
                    <option value="">-- Select Role --</option>
                    <option value="Student">Student</option>
                    <option value="Class Advisor">Class Advisor</option>
                    <option value="HOD">HOD</option>
                    <option value="Warden">Warden</option>
                </select>
            </div>
            <div>
                <ValidateUser role={username} />
            </div>
        </div>
    );
}

export default Signup;
