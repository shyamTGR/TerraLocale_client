import styles from '../form.module.css';
import {Link, useNavigate} from "react-router-dom";
import Authentication from "../Authentication";
import {useState} from "react";
import Error from "../../../components/feedback/error/Error";
import {authLogin} from "../../../actions/auth";
import {useDispatch} from "react-redux";
import Gsign from "../gsign";
import { useAuth } from '../authContext';
//import { googleLogout, useGoogleLogin } from '@react-oauth/google';
//import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const logged, setLog = useState();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { currentUser, login, logout } = useAuth();

    if(currentUser){
        navigate("/");
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(validateEmail(email)){

            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();

            if (response.ok) {
                alert(data.token);
                login(data.token);
                navigate('/');
            } else {
                throw new Error(data.message || 'Unable to login');
            }
        }else{
            alert("Enter Valid Email")
        }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const [error, setError] = useState("");


   

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            <div className={styles['header']}>
                <Gsign/>
                <div className={styles['title']}>Login with your email</div>
                <div className={styles['login']}>New to Runners? <Link to={'/signup'}>Sign Up</Link></div>
            </div>
            <div className={styles['form']}>
                <input onChange={(e) => setEmail(e.target.value)} name={'email'} value={email} placeholder={'Email'}
                       type={'email'}/>
                <input onChange={(e) => setPassword(e.target.value)} name={'password'} value={password}
                       placeholder={'Password'} type={'password'}/>
                <button onClick={handleSubmit} className={'btn1'}>Login</button>
            </div>
        </div>);

}

export default Login;