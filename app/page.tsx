"use client";

import { useState } from "react";

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {

    try {

      setLoading(true);

      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      if (data.image) {
        setImage(String(data.image));
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />

      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full" />

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <header className="flex items-center justify-between px-10 py-8 border-b border-white/10 backdrop-blur-xl">

          <h1 className="text-3xl font-extrabold tracking-tight">
            VisionFlow AI
          </h1>

          <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
            Dashboard
          </button>

        </header>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full backdrop-blur-xl mb-8">

            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

            <span className="text-sm text-zinc-300">
              AI Video Generation Active
            </span>

          </div>

          <h2 className="text-7xl md:text-8xl font-extrabold leading-tight tracking-tight">

            Yapay Zekâ ile
            <br />

            <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Video Üret
            </span>

          </h2>

          <p className="mt-8 text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed">

            Yazıyı sinematik videolara dönüştür.
            AI ile TikTok, Reels ve YouTube Shorts içerikleri üret.

          </p>

          {/* PROMPT BOX */}
          <div className="mt-16 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 max-w-4xl mx-auto shadow-2xl">

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Örn: Yağmurlu cyberpunk şehirde yürüyen gizemli adam..."
              className="w-full h-44 bg-black/40 border border-white/10 rounded-3xl p-6 text-xl resize-none focus:outline-none"
            />

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <select className="bg-black/40 border border-white/10 rounded-2xl p-4 text-lg">

                <option>9:16 TikTok</option>
                <option>16:9 YouTube</option>
                <option>1:1 Instagram</option>

              </select>

              <select className="bg-black/40 border border-white/10 rounded-2xl p-4 text-lg">

                <option>Sinematik</option>
                <option>Anime</option>
                <option>Cyberpunk</option>
                <option>Gerçekçi</option>

              </select>

            </div>

            <button
              onClick={generateImage}
              className="w-full mt-6 bg-white text-black py-5 rounded-3xl text-2xl font-bold hover:scale-[1.02] transition"
            >

              {loading ? (

                <div className="flex items-center justify-center gap-3">

                  <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin" />

                  <span>AI Video Oluşturuyor...</span>

                </div>

              ) : (

                "🎬 AI Video Oluştur"

              )}

            </button>

          </div>

          {/* RESULT */}
          {image && (

            <div className="mt-16 max-w-5xl mx-auto">

              <div className="bg-white/5 border border-white/10 rounded-[40px] p-6 backdrop-blur-2xl">

                <img
                  src={image}
                  alt="AI"
                  className="rounded-3xl w-full border border-white/10"
                />

                <video
                  className="mt-6 rounded-3xl w-full border border-white/10"
                  autoPlay
                  muted
                  loop
                  controls
                >
                  <source
                    src="https://videos.pexels.com/video-files/3195650/3195650-uhd_2560_1440_25fps.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* VIDEO CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mt-10">

                  {[1,2,3].map((item) => (

                    <div
                      key={item}
                      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-105 transition"
                    >

                      <img
                        src={image}
                        alt="preview"
                        className="h-52 w-full object-cover"
                      />

                      <div className="p-4">

                        <h3 className="text-xl font-bold">
                          AI Sahne #{item}
                        </h3>

                        <p className="text-zinc-400 mt-2 text-sm">
                          Yapay zekâ tarafından oluşturulan sinematik sahne.
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          )}

        </section>

      </div>

    </main>

  );
}