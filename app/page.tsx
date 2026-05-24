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

    <main className="min-h-screen bg-black text-white flex flex-col lg:flex-row">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/10 p-6">

        <h1 className="text-4xl lg:text-5xl font-bold mb-10">
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
            AI Videos
          </button>

          <button className="w-full bg-white/10 py-4 rounded-2xl">
            Settings
          </button>

        </div>

      </aside>

      {/* CONTENT */}
      <section className="flex-1 p-6 lg:p-10">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

          <div>

            <h1 className="text-4xl lg:text-7xl font-bold">
              AI Dashboard 🎨
            </h1>

            <p className="text-white/50 text-base lg:text-xl mt-2 break-all">
              Hoşgeldin, {user} 👋
            </p>

            <p className="text-white/60 text-lg lg:text-2xl mt-3">
              AI görseller ve videolar üret
            </p>

          </div>

          <div className="flex flex-col lg:flex-row gap-4">

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

        {/* EMPTY */}
        {!image && !video && !loading && (

          <div className="bg-white/5 border border-white/10 rounded-[40px] h-[300px] lg:h-[500px] flex items-center justify-center">

            <div className="text-center px-4">

              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Henüz İçerik Yok 🚀
              </h2>

              <p className="text-white/50 text-lg lg:text-2xl">
                İlk AI görselini veya videonu oluştur
              </p>

            </div>

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <div className="bg-white/5 border border-white/10 rounded-[40px] h-[300px] lg:h-[500px] flex items-center justify-center">

            <div className="text-2xl lg:text-5xl font-bold animate-pulse text-center px-4">
              AI içerik oluşturuyor... 🚀
            </div>

          </div>

        )}

        {/* IMAGE */}
        {image && !loading && (

          <div className="mb-10">

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

              <h2 className="text-3xl lg:text-4xl font-bold">
                AI Görsel 🖼️
              </h2>

              <a
                href={image}
                download="visionflow-image.jpg"
                className="bg-green-600 px-6 py-4 rounded-2xl font-bold text-center"
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

        {/* VIDEO */}
        {video && !loading && (

          <div className="mt-10">

            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
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

        {/* HISTORY */}
        {history.length > 0 && (

          <div className="mt-20">

            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Geçmiş 🚀
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {history.map((item, index) => (

                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-3xl"
                >

                  {item.type === "image" ? (

                    <img
                      src={item.url}
                      className="rounded-2xl w-full"
                    />

                  ) : (

                    <video
                      controls
                      className="rounded-2xl w-full"
                    >

                      <source
                        src={item.url}
                        type="video/mp4"
                      />

                    </video>

                  )}

                </div>

              ))}

            </div>

          </div>

        )}

      </section>

      {/* MODAL */}
      {open && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">

          <div className="bg-zinc-900 p-6 lg:p-8 rounded-[40px] w-full max-w-2xl border border-white/10">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl lg:text-4xl font-bold">
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
              className="w-full h-40 bg-black/40 rounded-3xl p-6 outline-none text-lg lg:text-xl"
            />

            <button
              onClick={generateImage}
              className="w-full mt-6 bg-white text-black py-5 rounded-3xl font-bold text-lg lg:text-xl"
            >
              🖼️ Görsel Oluştur
            </button>

            <button
              onClick={generateVideo}
              className="w-full mt-4 bg-purple-600 py-5 rounded-3xl font-bold text-lg lg:text-xl"
            >
              🎬 Video Oluştur
            </button>

          </div>

        </div>

      )}

    </main>

  );

}