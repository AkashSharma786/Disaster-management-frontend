import './RegistrationPage.css';
import { useState } from 'react';
import districtsData from './assets/Districts.json';


function RegistrationPage() {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [district, setDistrict] = useState('');
    const [stateOrUT, setStateOrUT] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const statesAndUTs = districtsData.states.map((state)=>state.name).concat(districtsData.unionTerritories.map((ut)=>ut.name));
    const [districts, setDistricts] = useState<string[]>([]);


    

    console.log(statesAndUTs);


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
        <h1>Register</h1>

            <div className="form-group">
                <label htmlFor='firstName'>First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter first name" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
            </div>

            <div className="form-group">
                <label htmlFor='lastName'>Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter last name" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
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
                <label htmlFor='StateOrUT'>State / Union Territory</label>
                <select id="StateOrUT" name="StateOrUT" value={stateOrUT} onChange={(e) =>{ 
                    
                    setDistricts(
                        districtsData.states.find((state) => state.name === e.target.value)?.districts ||
                        districtsData.unionTerritories.find((ut) => ut.name === e.target.value)?.districts ||
                        []
                    );
                     setStateOrUT(e.target.value)}
                    
                    } required>
                    <option value="">-- Select a State or Union Territory --</option>
                    {statesAndUTs.map((stateOrUTName) => (
                        <option key={stateOrUTName} value={stateOrUTName}>{stateOrUTName}</option>
                    ))}
                </select>
                
            </div>

            <div className="form-group">
                <label htmlFor='District'>District</label>
                <select id="District" name="District" value={district} onChange={(e) => setDistrict(e.target.value)} required>
                    <option value="">-- Select a District --</option>
                    {districts.map((districtName) => (
                        <option key={districtName} value={districtName}>{districtName}</option>
                    ))}
                </select>
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

            

            
            <div className="form-group">
            <button type="submit"   onClick={()=>{
                console.log(username, password, email, location, role, phoneNumber);
                handleSubmit();
            }}
            >Submit</button>
            </div>
            
            <div className="form-group">
                <label htmlFor="loginLink">Already have an account? 
                    <a href="/login">Login here</a>
                </label>
            </div>
       
    </div>
    </>
    );

}

export default RegistrationPage