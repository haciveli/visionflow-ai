"use client";

import { useState } from "react";

export default function DashboardPage() {

  const [open, setOpen] = useState(false);

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [videos, setVideos] = useState([
    {
      title: "Cyberpunk City",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "AI Robot",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

  const createVideo = async () => {

    if (!prompt) return;

    setLoading(true);

    setTimeout(() => {

      const newVideo = {
        title: prompt,
        image:
          "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
      };

      setVideos([newVideo, ...videos]);

      setLoading(false);

      setOpen(false);

      setPrompt("");

    }, 3000);

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
            Videolarım
          </button>

          <button className="w-full bg-white/10 py-4 rounded-2xl">
            AI Oluştur
          </button>

          <button className="w-full bg-white/10 py-4 rounded-2xl">
            Ayarlar
          </button>

        </div>

      </aside>

      {/* CONTENT */}
      <section className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-6xl font-extrabold">
              Dashboard 🎬
            </h2>

            <p className="text-white/60 mt-3 text-xl">
              AI ile oluşturulan videolar
            </p>

          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            + Yeni Video
          </button>

        </div>

        {/* VIDEO GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {videos.map((video, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 transition"
            >

              <img
                src={video.image}
                alt={video.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold">
                  {video.title}
                </h3>

                <p className="text-white/60 mt-2">
                  AI tarafından oluşturuldu
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* MODAL */}
      {open && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[40px] p-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-4xl font-extrabold">
                Yeni Video Oluştur 🎬
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl"
              >
                ✕
              </button>

            </div>

            <textarea
              placeholder="Bir video sahnesi yaz..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 bg-black/40 border border-white/10 rounded-3xl p-6 text-xl outline-none"
            />

            <button
              onClick={createVideo}
              className="w-full mt-6 bg-white text-black py-5 rounded-3xl text-2xl font-bold"
            >

              {loading
                ? "AI Video Oluşturuyor... 🚀"
                : "🚀 AI Video Oluştur"}

            </button>

          </div>

        </div>

      )}

    </main>

  );

}