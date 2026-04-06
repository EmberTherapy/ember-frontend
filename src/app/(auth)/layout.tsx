import React from "react";
import './auth.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-root">
        <h1 className="brand">Ember</h1>
        <div className="auth-card">
            {children}
        </div>
    </div>
  );
}