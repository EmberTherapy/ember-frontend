'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createUser, createClient, validateLinkToken } from "@/app/lib/api/auth";
import { useEffect } from 'react';

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [clientId, setClientId] = useState("");

    useEffect(() => {
        const validateToken = async () => {
            console.log("Validating token:", token);
            const token_validation = await validateLinkToken(token ?? '');

            if (token_validation.status == 'failure') {
                router.replace("/invalid");
                return;
            }

            if (!token_validation.client_id) {
                router.replace("/invalid");
                return;
            }
            setClientId(token_validation.client_id);
        }
        if (token) {
            validateToken();
        }
    }, [token, router]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const [apiStatus, setApiStatus] = useState<boolean | null>(null);


    const successMessage = <p className="success">Successful. Redirecting...</p>
    const failMessage = <p className="fail">{errorMessage}</p>;

    function checkForm(): boolean {
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {

            setErrorMessage("All fields are required.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return false;
        }
        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setErrorMessage("Password must contain both letters and numbers.");
            return false;
        }

        setErrorMessage("");
        return true;
    }

    async function handleSignup() {
        if (!checkForm()) {
            setApiStatus(false);
        }
        else {
            let response;
            if (clientId) {
                response = await createClient(email, password, firstName, lastName, clientId);
            } else {
                response = await createUser(email, password, firstName, lastName);
            }
            if (response.message === "User already exists") {
                setErrorMessage("An account with this email already exists. Please log in!");
                setApiStatus(false);
                return;
            }
            else if (response.status !== "success") {
                setErrorMessage("An error occurred. Please try again.");
                setApiStatus(false);
                return;
            }

            setApiStatus(true);
            router.push("/verify");
        }
    }

    return (
        <div className="card-content">
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
                Already have an account? <a href="/login">Log in</a>
                </p>
                {/* {failMessage} */}
                {apiStatus === true ? successMessage : apiStatus === false ? failMessage : null}
        </div>
    );
}
