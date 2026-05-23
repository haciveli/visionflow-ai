"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    alert("Kayıt sistemi yakında 😄");
  };

  const signIn = async () => {
    window.location.href = "/dashboard";
  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">

        <h1 className="text-5xl font-extrabold mb-10 text-center">
          VisionFlow 🔐
        </h1>

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 mb-4"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 mb-6"
        />

        <button
          onClick={signIn}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold mb-4"
        >
          Giriş Yap
        </button>

        <button
          onClick={signUp}
          className="w-full bg-white/10 border border-white/10 py-4 rounded-2xl"
        >
          Kayıt Ol
        </button>

      </div>

    </main>

  );
}