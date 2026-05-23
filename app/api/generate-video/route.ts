"use client";

import { useState } from "react";

export default function DashboardPage() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const generateImage = async () => {

    setLoading(true);

    setTimeout(() => {

      setImage(
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
      );

      setLoading(false);

    }, 2000);

  };

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-extrabold mb-4">
          VisionFlow AI 🎨
        </h1>

        <p className="text-white/60 text-xl mb-10">
          Yapay zeka görsel sistemi
        </p>

        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">

          <textarea
            placeholder="Bir şey yaz..."
            className="w-full h-40 bg-black/40 border border-white/10 rounded-3xl p-6 text-xl outline-none"
          />

          <button
            onClick={generateImage}
            className="w-full mt-6 bg-white text-black py-5 rounded-3xl text-2xl font-bold"
          >
            🎨 Görsel Oluştur
          </button>

        </div>

        {loading && (

          <div className="mt-10 text-center text-3xl animate-pulse">
            Görsel hazırlanıyor... 🚀
          </div>

        )}

        {image && (

          <div className="mt-10">

            <img
              src={image}
              alt="AI"
              className="w-full rounded-3xl"
            />

          </div>

        )}

      </div>

    </main>

  );

}