import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
//import styles from './gsign.module.css';
import GLogo from './google.svg'
import {Link, useNavigate} from "react-router-dom";

function Gsign() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => onSuccess(),
        onError: (error) => console.log('Login Failed:', error)
    });
    const onSuccess = () => {
        navigate('/');
    }

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    const prof = () =>{setProfile(false)};
    return (
        <div >
            <h2 ></h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
               <div style={{margin:"0 auto"}}> <button onClick={() => login()} style={{margin:"auto"}}>  <img src={GLogo} style={{width:"15px"}}alt="GLogo" /> Sign in with Google 🚀 </button>
            </div>
            )}
        </div>
    );
}
export default Gsign;