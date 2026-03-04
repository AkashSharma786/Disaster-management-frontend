import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { parseAuthToken } from '../common/parseAuthToken';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/auth';
import '../../assets/styles/container/formContainer.css';
import saveStateAndDistricts from '../../utils/saveStateAndDistricts';
function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(email.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }
        

            const response = axios.post('http://localhost:8080/api/auth/login', { username: email, password :password })
            .then(response => {
                console.log(response.data); 


                if(response.status === 200) {  
                    
                    console.log(response.status);
                    localStorage.setItem('token', response.data);
                        const userInfo = parseAuthToken(response.data);

                        if (userInfo != null) {
                            console.log(userInfo);
                            dispatch(setUserInfo(userInfo));
                            console.log('User info set in Redux store:', userInfo);
                            console.log(userInfo.role.toLowerCase())
                            
                            navigate(`/${userInfo.role.toLowerCase()}`);
                          
                        }

                    
                    
                    
                    alert('Login successful!');
                    
                   
                }
                
            })
            .catch(error => {
                
                alert('Login failed! Please check your credentials and try again.');
                console.log('Error during login:', error);
            });

            
        
    }
    

    return(<>

    <div className="container form-container">

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
                <button className='button' type="submit" onClick={handleLogin}>Login</button>
            </div>

            <div>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
    </div>
    
    </>);
}

export default Login;