"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";


export default function LogoutButton() {
  const { logout } = useAuth();
const router = useRouter();

  const handleLogout = async () => {
  await logout();
  router.push("/login");
};

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
