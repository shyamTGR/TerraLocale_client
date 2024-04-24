import styles from '../form.module.css';
import Authentication from "../Authentication";
//import {Link} from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../authContext';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "fname": "",
        "lname": "",
        "email": "",
        "password": ""
    })
    const { currentUser, login, logout } = useAuth();

    if(currentUser){
        navigate("/");
    }

    const onSuccess = () => {
        if(formData.fname.trim() != "" && formData.lname.trim() != "" && formData.email.trim() != "" && formData.password.trim() != ""){
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regex.test(String(formData.email).toLowerCase())){
                fetch("http://localhost:5000/auth/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": formData.fname + " " + formData.lname,
                        "email": formData.email,
                        "password": formData.password
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json(); // Parse JSON response into native JavaScript objects
                })
                .then(data => {
                    alert('Success:', data); // Handling the success case
                    setFormData({
                        "fname": "",
                        "lname": "",
                        "email": "",
                        "password": ""
                    });
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error:', error); // Handling errors that occurred during the fetch operation
                });
            }else{
                alert("Enter valid email");
            }
        }else{
            alert("Enter all data");
        }
        
    }
    const form =
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['title']}>Sign up with your email</div>
                <div className={styles['login']}>Already have an account? <Link to={'/login'}>Login</Link></div>
            </div>
            <div className={styles['form']}>
                <input value={formData.fname} onChange={e=>setFormData({...formData, fname: e.target.value})} placeholder={'First Name'}/>
                <input value={formData.lname} onChange={e=>setFormData({...formData, lname: e.target.value})} placeholder={'Last Name'}/>
                <input value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} placeholder={'Email'}/>
                <input value={formData.password} onChange={e=>setFormData({...formData, password: e.target.value})} placeholder={'Password'} type={'password'}/>
                <button onClick={onSuccess} className={'btn1'}>Sign Up</button>
            </div>
        </div>

    return <Authentication data={form}/>
}

export default Signup;