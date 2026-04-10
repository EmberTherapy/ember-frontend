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
        try {
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
        }
        catch (error) {
          setHealthStatus("Down");
          setEnv("Unknown");
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
          <div className="status-row">
            <span className="status-label">API Status:</span>
            <span className={"stacked-status-pill status-pill" + (healthStatus === "Healthy" ? " status-pill--green" : healthStatus === "Down" ? " status-pill--red" : "")}>
              {healthStatus}
            </span>
          </div>

          <div className="status-row">
            <span className="status-label">Environment:</span>
            <span className={"stacked-status-pill status-pill" + (env === "Prod" ? " status-pill--blue" : env === "Dev" ? " status-pill--yellow" : " status-pill--grey")}>
              {env}
            </span>
          </div>
        </AdminModule>
      </div>
    </main>
  );
}
