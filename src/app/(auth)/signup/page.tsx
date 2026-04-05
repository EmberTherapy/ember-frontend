'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createTherapist, createClient, validateLinkToken } from "@/app/lib/api/auth";

function SignupContent() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const role = searchParams.get('role')
    const [clientId, setClientId] = useState("");

    useEffect(() => {
        const validateToken = async (token: string, role: string) => {
            const token_validation = await validateLinkToken(token, role);

            if (token_validation.status == 'failure') {
                router.replace("/invalid");
                return;
            }
            if (role == "client") {
                if (!token_validation.client_id) {
                    router.replace("/invalid");
                    return;
                }
                setClientId(token_validation.client_id);
            }
            else if (role == "therapist") {
                if (!token_validation.therapist_email) {
                    router.replace("/invalid");
                    return;
                }

            }
        }
        if (token && role) {
            validateToken(token, role);
        }
        else {
            router.replace("/invalid");
        }
    }, [token, role, router]);

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
        console.log("Handling signup for", {firstName, lastName, email, password, confirmPassword, token, role, clientId});
        if (!checkForm()) {
            setApiStatus(false);
        }
        else {
            let response;
            if (clientId) {
                response = await createClient(email, password, firstName, lastName, clientId, token? token : "");
            } else {
                response = await createTherapist(email, password, firstName, lastName, token? token : ""); 
            }
            console.log("Signup response:", response);
            if (response.message === "User already exists") {
                setErrorMessage("An account with this email already exists. Please log in!");
                setApiStatus(false);
                return;
            }
            else if (response.status !== "success") {
                setErrorMessage(response.message || "An error occurred during signup. Please try again.");
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

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}