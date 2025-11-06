'use client'

import { redirect } from "next/dist/server/api-utils";
import "../auth.css";
import {useState} from 'react';

export default function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const successMessage = <p className="success">Successful. Redirecting...</p>
    const failMessage = <p className="fail">Please try again...</p>

    let [loginStatus, setLoginStatus] = useState<boolean | null>(null); // null, true, false

    function handleSignup() {
        console.log(email, password);

        const apiStatus = true;
        setLoginStatus(apiStatus);

        if (apiStatus) {
            window.location.href = "/dashboard";
        }

    }

    return (
        <div className="main">
            <h1 className="brand">Ember</h1>
            
            <div className="card">
                <p className="subtitle">Welcome to Ember!</p>

                <form onSubmit={e => {e.preventDefault(); handleSignup();}}>
                    <div className="name-row">
                        <label>
                            First Name
                            <input type="text" name="firstName" placeholder="John" onChange={e => setFirstName(e.target.value)}/>
                        </label>

                        <label>
                            Last Name
                            <input type="text" name="lastName" placeholder="Doe" onChange={e => setLastName(e.target.value)}/>
                        </label>
                    </div>

                    <label>
                        Email
                        <input type="email" name="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)}/>
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)}/>
                    </label>

                    <label>
                        Confirm Password
                        <input type="password" name="confirmPassword" placeholder="••••••••" onChange={e => setConfirmPassword(e.target.value)}/>
                    </label>

                    <button type="submit">Sign Up</button>
                </form>

                <p className="footer">
                Already have an account? <a href="../auth/login">Log in</a>
                </p>

                {loginStatus === true ? successMessage : loginStatus === false ? failMessage : null}
            </div>
        </div>
    );
}
