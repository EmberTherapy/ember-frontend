'use client'

import { useState } from 'react';
import { authenticateUser } from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const successMessage = <p className="success">Log in successful. Redirecting...</p>
    const failMessage = <p className="fail">{errorMessage}</p>
        

    const [loginStatus, setLoginStatus] = useState<boolean | null>(null); // null, true, false

    async function handleLogin() {
        const auth_res = await authenticateUser(email, password);
        const status = auth_res.status === 'success'
        setLoginStatus(status);

        if (auth_res.role === "therapist") {
            console.log("Therapist logged in, redirecting to clients page...");
            router.push("/clients");
        }
        else if (auth_res.role === "client") {
            router.push("/chat");
        }
        else {
            setLoginStatus(false);
            setErrorMessage(auth_res.message);
        }
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
