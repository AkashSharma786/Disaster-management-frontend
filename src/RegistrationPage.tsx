import './RegistrationPage.css';
import { useState } from 'react';

function RegistrationPage() {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const registrationData = {
            username,
            role,
            email,
            location,
            phoneNumber,
            password
        };
        try {

            

            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });
            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert('Registration failed!');
            }


        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    
    return (
    <>
    <div className="container">
        <h1>Disaster Report Form</h1>

            <div className="form-group">
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
            </div>
        
            <div className="form-group">
                <label htmlFor='Role'>role</label>
                <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">-- Select a Role --</option>
                    <option value="Admin">Admin</option>
                    <option value="Respondent">Respondent</option>
                    <option value="Resident">Resident</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            </div>

            <div className="form-group">
                <label htmlFor='location'>Location</label>
                <input type="text" id="location" name="location" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} required></input>
            </div>

            
            <div className="form-group">
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required></input>
            </div>

            <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div>

            <div className="form-group">
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
            </div>

            

            <button type="submit"   onClick={()=>{
                console.log(username, password, email, location, role, phoneNumber);
                handleSubmit();
            }}
            >Submit</button>
       
    </div>
    </>
    );

}

export default RegistrationPage