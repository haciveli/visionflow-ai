"use client";

import { useState } from "react";

export default function DashboardPage() {

  const [open, setOpen] = useState(false);

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("");

  const generateImage = async () => {

    if (!prompt) return;

    setLoading(true);

    try {

      const response = await fetch("/api/generate-image", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      console.log(data);

      setImage(data.image);

      setOpen(false);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/10 bg-white/5 p-6">

        <h1 className="text-4xl font-extrabold mb-10">
          VisionFlow 🚀
        </h1>

        <div className="space-y-4">

          <button className="w-full bg-white text-black py-4 rounded-2xl font-bold">
            Dashboard
          </button>

          <button className="w-full bg-white/10 py-4 rounded-2xl">
            AI Images
          </button>

          <button className="w-full bg-white/10 py-4 rounded-2xl">
            Videos
          </button>

          <button className="w-full bg-white/10 py-4 rounded-2xl">
            Settings
          </button>

        </div>

      </aside>

      {/* CONTENT */}
      <section className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-6xl font-extrabold">
              AI Dashboard 🎨
            </h2>

            <p className="text-white/60 mt-3 text-xl">
              OpenAI ile gerçek görseller üret
            </p>

          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            + Yeni Görsel
          </button>

        </div>

        {/* IMAGE RESULT */}
        {image && (

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 mb-10">

            <h3 className="text-3xl font-bold mb-6">
              Oluşturulan Görsel 🖼️
            </h3>

            <img
              src={image}
              alt="AI"
              className="w-full rounded-3xl"
            />

          </div>

        )}

        {/* EMPTY STATE */}
        {!image && (

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center">

            <h3 className="text-4xl font-bold mb-4">
              Henüz Görsel Yok 🚀
            </h3>

            <p className="text-white/60 text-xl">
              İlk AI görselini oluşturmak için yukarıdaki butona bas.
            </p>

          </div>

        )}

      </section>

      {/* MODAL */}
      {open && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[40px] p-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-4xl font-extrabold">
                Yeni Görsel Oluştur 🎨
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl"
              >
                ✕
              </button>

            </div>

            <textarea
              placeholder="Örnek: cinematic cyberpunk city at night"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 bg-black/40 border border-white/10 rounded-3xl p-6 text-xl outline-none"
            />

            <button
              onClick={generateImage}
              className="w-full mt-6 bg-white text-black py-5 rounded-3xl text-2xl font-bold"
            >

              {loading
                ? "AI Görsel Oluşturuyor... 🚀"
                : "🚀 Görsel Oluştur"}

            </button>

          </div>

        </div>

      )}

    </main>

  );

}