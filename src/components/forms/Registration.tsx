
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setDistricts } from '../../redux/slices/districts';
import { setStateOrUtList } from '../../redux/slices/stateOrUt';
import '../../assets/styles/container/formContainer.css';

function Registration() {

    const dispatch = useDispatch();
    const districts = useSelector((state: any) => state.districts.districts);
    const stateOrUtList = useSelector((state: any) => state.stateOrUts.stateOrUtList);


    console.log(stateOrUtList);
    console.log(districts);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(0);
    const [email, setEmail] = useState('');
    const [districtLgdCode, setDistrictLgdCode] = useState(-1);
    const [districtList, setDistrictList] = useState([]);
    const [selectedStateOrUT, setSelectedStateOrUT] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');










    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (firstName.trim() === ''
            || lastName.trim() === ''
            || role === 0
            || email.trim() === ''
            || selectedStateOrUT === null
            || districtLgdCode === -1
            || phoneNumber.trim() === ''
            || password.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }
        const registrationData = {
            "firstName": firstName,
            "lastName": lastName,
            "role": role,
            "email": email,

            "district": districtLgdCode,
            "phoneNumber": phoneNumber,
            "password": password
        };
        try {



            axios.post('http://localhost:8080/api/auth/register', registrationData)
                .then(response => {
                    alert('Registration successful!');
                })
                .catch(error => {
                    alert('Registration failed!');
                    console.error('Error during registration:', error);
                });



        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    return (
        <>
            <div className="container form-container" >

                <div className="header">

                    <h1>Register</h1>

                </div>


                <div className="form-group">
                    <label htmlFor='firstName'>First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
                </div>

                <div className="form-group">
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
                </div>

                <div className="form-group">
                    <label htmlFor='Role'>role</label>
                    <select id="role" name="role" value={role} onChange={(e) => setRole(Number.parseInt(e.target.value))} required>
                        <option value={0}>-- Select a Role --</option>
                        <option value={1}>Admin</option>
                        <option value={2}>Respondent</option>
                        <option value={3}>Resident</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>

                <div className="form-group">
                    <label htmlFor='StateOrUT'>State / Union Territory</label>
                    <select id="StateOrUT" name="StateOrUT" value={selectedStateOrUT}
                        onChange={(e) => {
                            setDistrictList(districts.filter(
                                (district: any) => district.stateorUt.id === Number.parseInt(e.target.value)));
                            setSelectedStateOrUT(Number.parseInt(e.target.value))

                        }



                        }
                        required>
                        <option value={0}>-- Select a State or Union Territory --</option>

                        {
                            stateOrUtList.map((stateOrUTName: any) => {
                                // console.log(stateOrUTName);
                                return <option key={stateOrUTName.id} value={stateOrUTName.id}>{stateOrUTName.name}</option>
                            })
                        }

                    </select>

                </div>

                <div className="form-group">
                    <label htmlFor='District'>District</label>
                    <select id="District" name="District" value={districtLgdCode} onChange={(e) => setDistrictLgdCode(Number.parseInt(e.target.value))} required>
                        <option value={0}>-- Select a District --</option>
                        {districtList.map((currentDistrict: any) => (
                            <option key={currentDistrict.lgdCode} value={currentDistrict.lgdCode}>{currentDistrict.name}</option>
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
                    <button className='button' type="submit" onClick={() => {
                        console.log(firstName, lastName, password, email, selectedStateOrUT, districtLgdCode, role, phoneNumber);
                        handleSubmit();
                    }}
                    >Submit</button>
                </div>

                <div className="form-group">
                    <label htmlFor="loginLink">Already have an account?
                        <Link to="/login">Login here</Link>
                    </label>
                </div>

            </div>
        </>
    );

}

export default Registration