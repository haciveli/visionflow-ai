"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [open, setOpen] = useState(false);

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("");

  const [video, setVideo] = useState("");

  const [user, setUser] = useState("");

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {

    const currentUser = localStorage.getItem("user");

    if (!currentUser) {

      window.location.href = "/login";

      return;

    }

    setUser(currentUser);

    const savedHistory =
      localStorage.getItem("history");

    if (savedHistory) {

      setHistory(JSON.parse(savedHistory));

    }

  }, []);

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

      if (data.image) {

        setImage(data.image);

        const newItem = {
          type: "image",
          url: data.image,
        };

        const updatedHistory = [
          newItem,
          ...history,
        ];

        setHistory(updatedHistory);

        localStorage.setItem(
          "history",
          JSON.stringify(updatedHistory)
        );

      } else {

        alert("Görsel oluşturulamadı");

      }

    } catch (error) {

      console.log(error);

      alert("Hata oluştu");

    } finally {

      setLoading(false);

      setOpen(false);

    }

  };

  const generateVideo = async () => {

    if (!prompt) return;

    setLoading(true);

    try {

      const response = await fetch("/api/generate-video", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (data.video) {

        setVideo(data.video);

        const newItem = {
          type: "video",
          url: data.video,
        };

        const updatedHistory = [
          newItem,
          ...history,
        ];

        setHistory(updatedHistory);

        localStorage.setItem(
          "history",
          JSON.stringify(updatedHistory)
        );

      } else {

        alert("Video oluşturulamadı");

      }

    } catch (error) {

      console.log(error);

      alert("Hata oluştu");

    } finally {

      setLoading(false);

      setOpen(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white flex">

      <aside className="w-72 border-r border-white/10 p-6">

        <h1 className="text-5xl font-bold mb-10">
          VisionFlow 🚀
        </h1>

      </aside>

      <section className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-7xl font-bold">
              AI Dashboard 🎨
            </h1>

            <p className="text-white/50 text-xl mt-2">
              Hoşgeldin, {user} 👋
            </p>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => setOpen(true)}
              className="bg-white text-black px-8 py-5 rounded-3xl font-bold"
            >
              + Yeni İçerik
            </button>

            <button
              onClick={() => {

                localStorage.removeItem("user");

                window.location.href = "/login";

              }}
              className="bg-red-600 px-6 py-5 rounded-3xl font-bold"
            >
              Çıkış Yap
            </button>

          </div>

        </div>

        {loading && (

          <div className="text-5xl font-bold">
            AI içerik oluşturuyor... 🚀
          </div>

        )}

        {image && !loading && (

          <div className="mb-10">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-4xl font-bold">
                AI Görsel 🖼️
              </h2>

              <a
                href={image}
                download="visionflow-image.jpg"
                className="bg-green-600 px-6 py-4 rounded-2xl font-bold"
              >
                📥 İndir
              </a>

            </div>

            <img
              src={image}
              alt="AI"
              className="w-full rounded-[40px]"
            />

          </div>

        )}

        {video && !loading && (

          <div className="mt-10">

            <h2 className="text-4xl font-bold mb-6">
              AI Video 🎬
            </h2>

            <video
              controls
              autoPlay
              className="w-full rounded-[40px]"
            >

              <source src={video} type="video/mp4" />

            </video>

          </div>

        )}

      </section>

      {open && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-zinc-900 p-8 rounded-[40px] w-full max-w-2xl border border-white/10">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-4xl font-bold">
                Yeni İçerik Oluştur 🎨
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl"
              >
                ✕
              </button>

            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Bir sahne hayal et..."
              className="w-full h-40 bg-black/40 rounded-3xl p-6 outline-none text-xl"
            />

            <button
              onClick={generateImage}
              className="w-full mt-6 bg-white text-black py-5 rounded-3xl font-bold text-xl"
            >
              🖼️ Görsel Oluştur
            </button>

            <button
              onClick={generateVideo}
              className="w-full mt-4 bg-purple-600 py-5 rounded-3xl font-bold text-xl"
            >
              🎬 Video Oluştur
            </button>

          </div>

        </div>

      )}

    </main>

  );

}