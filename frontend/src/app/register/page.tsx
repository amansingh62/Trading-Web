"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      router.push("/login");
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl w-96"
      >
        <h1 className="text-white text-2xl mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          minLength={6}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
