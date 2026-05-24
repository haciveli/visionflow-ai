"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (!email || !password) {

      alert("Bilgileri doldur");

      return;

    }

    localStorage.setItem("user", email);

    window.location.href = "/dashboard";

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md">

        <h1 className="text-5xl font-bold text-center mb-10">
          VisionFlow 🚀
        </h1>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-black mb-4 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-black mb-6 border border-zinc-700"
        />

        <button
          onClick={login}
          className="w-full bg-white text-black py-4 rounded-xl font-bold"
        >
          Giriş Yap 🚀
        </button>

      </div>

    </main>

  );

}