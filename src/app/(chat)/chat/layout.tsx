'use client';

import { useEffect } from "react";
import { validateSession } from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    useEffect(() => {
      const check = async () => {
        const res = await validateSession();

        console.log("Session validation result:", res);
  
        if (res.status !== "success") {
          console.log("No valid session, redirecting to login.");
          router.replace("/login");
        }
  
        else if (res.role == "therapist") {
          router.replace("/clients");
        }
      }
  
      check();
    }, []);
  
    return (
      <div>
        {children}
      </div>
    )
}