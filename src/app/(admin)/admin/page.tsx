'use client';

import { useEffect, useState } from 'react';
import { inviteTherapist } from "@/app/lib/api/invite";
import { healthCheck } from "@/app/lib/api/health";
import AdminModule from "@/app/(admin)/components/AdminModule";
import { toast } from 'sonner';
import '@/app/(admin)/admin.css';

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  const [healthStatus, setHealthStatus] = useState("");
  const [env, setEnv] = useState("");

  useEffect(() => {
      const checkHealth = async () => {
        console.log("Performing health check...");
        const healthRes = await healthCheck();
        
        if (healthRes.status === "success") {
          setHealthStatus("Healthy");
          if (healthRes.environment == "production") {
            setEnv("Prod");
          }
          else if (healthRes.environment == "development") {
            setEnv("Dev");
          }
        }
        else {
          setHealthStatus("Down");
          setEnv("N/A");
        }
      };

      checkHealth();
  }, []);

  async function handleInvite() {
    const res = await inviteTherapist(email, firstName, isFriend);

    if (res.status === "success") {
        toast.success("Therapist invited successfully!");
        setEmail("");
        setFirstName("");
        setIsFriend(false);
    } else {
        toast.error("Failed to invite therapist: " + res.message);

    }
  }

  return (
    <main className="admin-page">
      <div className="admin-grid">
        <AdminModule title="Invite Therapist">
          <form
            className="admin-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleInvite();
            }}
          >
            <label className="admin-label">
              Therapist Email:
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="admin-label">
                Therapist First Name:
                <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>

            <label className="admin-checkbox-row">
                Is Friend?
                <input
                    type="checkbox"
                    name="isFriend"
                    checked={isFriend}
                    onChange={(e) => setIsFriend(e.target.checked)}
                />   
            </label>

            <button type="submit">Invite</button>
          </form>
        </AdminModule>

        <AdminModule title="System Status">
          <p>Health Status: <span className={ "health-span" + (healthStatus === "Healthy" ? " healthy" : healthStatus === "Down" ? " down" : "") }>{healthStatus}</span></p>
          <p>Environment: <span className={ "health-span" + (env === "Prod" ? " prod" : env === "Dev" ? " dev" : "") }>{env}</span></p>
        </AdminModule>
      </div>
    </main>
  );
}
