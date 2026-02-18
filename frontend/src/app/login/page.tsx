"use client";

import { useAuth } from "@/src/context/AuthContext";
import api from "@/src/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { login } = useAuth();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       try {
        await api.post("/auth/login", { email, password });
        await login();
        router.push("/dashboard");
       } catch {
        alert("Invalid Credentials");
       }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
         <form onSubmit={submit} className="bg-gray-800 p-8 rounded-xl w-96">

        <h1 className="text-white text-2xl mb-6 text-center">
          Login
        </h1>

        <input type="email" 
        required
        className="w-full mb-4 p-2 rounded bg-gray-700 text-white" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>

        <input
          type="password"
          required
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
        >
          Login
        </button>
         </form>
        </div>
    )
}