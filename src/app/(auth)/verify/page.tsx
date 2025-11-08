'use client'

import { redirect } from "next/dist/server/api-utils";
import "../auth.css";
import {useState} from 'react';
export default function VerifyPage() {

    async function handleRedirect() {
        window.location.href = "/login"
    }

    return (
        <div className="card-content">
            <p className="subtitle">Welcome to Ember!</p>

            <p className="info">A verification link has been sent to your email address. Please check your inbox and click on the link to verify your account.</p>
            <p className="footer">
                Already have an account? <a onClick={handleRedirect}>Log in</a>
            </p>
        </div>
    );
}