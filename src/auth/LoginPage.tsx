import { useState } from 'react';
import { Link } from 'react-router';

function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(email.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }); 
            if (response.ok) {
                alert('Login successful!');
            }
            else {
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }   
    };

    return(<>

    <div className="container">

            <div className="header">
                 <h2>Login</h2>
            </div>
           
        
            <div className="form-group">
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div>

            <div className="form-group">
                <button type="submit" onClick={handleLogin}>Login</button>
            </div>

            <div>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
    </div>
    
    </>);
}

export default LoginPage;