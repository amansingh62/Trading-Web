"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import LogoutButton from "@/src/components/LogoutButton";

export default function Dashboard() {
  const { userId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userId) {
      router.push("/login");
    }
  }, [loading, userId, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <p>User ID: {userId}</p>
      <LogoutButton />
    </div>
  );
}
