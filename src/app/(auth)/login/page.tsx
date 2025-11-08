'use client'

import { redirect } from "next/dist/server/api-utils";
import "../auth.css";
import {useState} from 'react';
import { authenticateUser } from "@/app/lib/api/fakeApi";
import { log } from "console";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const successMessage = <p className="success">Log in successful. Redirecting...</p>
    const failMessage = <p className="fail">Log in unsuccessful. Please try again...</p>

    let [loginStatus, setLoginStatus] = useState<boolean | null>(null); // null, true, false

    async function handleLogin() {
        const auth_res = await authenticateUser(email, password);
        setLoginStatus(auth_res.status);

        if (auth_res.status) {
            console.log("Login successful, token:", auth_res.token);
            window.location.href = "/clients";
        }

        return;
    }

    return (
        <div className="card-content">
            <p className="subtitle">Welcome back — sign in to continue!</p>

            <form onSubmit={e => {e.preventDefault(); handleLogin();}}>
            <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)}/>
            </label>

            <label>
                Password
                <input type="password" name="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)}/>
            </label>

            <button type="submit">Log In</button>
            </form>

            <p className="footer">
            Don’t have an account? <a href="/signup">Sign up</a>
            </p>

            {loginStatus === true ? successMessage : loginStatus === false ? failMessage : null}
        </div>
    );
}
