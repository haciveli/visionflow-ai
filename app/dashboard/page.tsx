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

    const savedHistory = localStorage.getItem("history");

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

    <main className="min-h-screen w-full overflow-x-hidden bg-black text-white">

      {/* HEADER */}
      <header className="w-full border-b border-white/10 p-4 lg:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="w-full overflow-hidden">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold break-words">
              VisionFlow 🚀
            </h1>

            <p className="text-white/50 mt-3 text-sm lg:text-lg break-all">
              Hoşgeldin, {user}
            </p>

          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto bg-white text-black px-6 py-4 rounded-2xl font-bold"
            >
              + Yeni İçerik
            </button>

            <button
              onClick={() => {

                localStorage.removeItem("user");

                window.location.href = "/login";

              }}
              className="w-full sm:w-auto bg-red-600 px-6 py-4 rounded-2xl font-bold"
            >
              Çıkış Yap
            </button>

          </div>

        </div>

      </header>

      {/* CONTENT */}
      <section className="w-full max-w-full overflow-x-hidden p-4 lg:p-10">

        <h2 className="text-3xl lg:text-6xl font-bold mb-8 break-words">
          AI Dashboard 🎨
        </h2>

        {/* EMPTY */}
        {!image && !video && !loading && (

          <div className="bg-white/5 border border-white/10 rounded-[30px] min-h-[250px] lg:min-h-[400px] flex items-center justify-center text-center px-4">

            <div>

              <h3 className="text-2xl lg:text-5xl font-bold mb-4 break-words">
                Henüz İçerik Yok 🚀
              </h3>

              <p className="text-white/50 text-base lg:text-2xl">
                İlk AI görselini veya videonu oluştur
              </p>

            </div>

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <div className="bg-white/5 border border-white/10 rounded-[30px] min-h-[250px] lg:min-h-[400px] flex items-center justify-center text-center px-4">

            <div className="text-2xl lg:text-5xl font-bold animate-pulse break-words">
              AI içerik oluşturuyor... 🚀
            </div>

          </div>

        )}

        {/* IMAGE */}
        {image && !loading && (

          <div className="mb-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

              <h2 className="text-2xl lg:text-4xl font-bold break-words">
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
              className="w-full max-w-full rounded-[30px]"
            />

          </div>

        )}

        {/* VIDEO */}
        {video && !loading && (

          <div className="mt-10">

            <h2 className="text-2xl lg:text-4xl font-bold mb-6 break-words">
              AI Video 🎬
            </h2>

            <video
              controls
              autoPlay
              className="w-full max-w-full rounded-[30px]"
            >

              <source src={video} type="video/mp4" />

            </video>

          </div>

        )}

        {/* HISTORY */}
        {history.length > 0 && (

          <div className="mt-20">

            <h2 className="text-2xl lg:text-4xl font-bold mb-8 break-words">
              Geçmiş 🚀
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {history.map((item, index) => (

                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-3xl overflow-hidden"
                >

                  {item.type === "image" ? (

                    <img
                      src={item.url}
                      className="w-full rounded-2xl"
                    />

                  ) : (

                    <video
                      controls
                      className="w-full rounded-2xl"
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

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">

          <div className="bg-zinc-900 w-full max-w-2xl rounded-[30px] border border-white/10 p-5 lg:p-8">

            <div className="flex items-center justify-between mb-6 gap-4">

              <h2 className="text-2xl lg:text-4xl font-bold break-words">
                Yeni İçerik 🎨
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
              className="w-full h-40 bg-black/40 rounded-3xl p-5 outline-none text-lg resize-none"
            />

            <button
              onClick={generateImage}
              className="w-full mt-6 bg-white text-black py-5 rounded-3xl font-bold"
            >
              🖼️ Görsel Oluştur
            </button>

            <button
              onClick={generateVideo}
              className="w-full mt-4 bg-purple-600 py-5 rounded-3xl font-bold"
            >
              🎬 Video Oluştur
            </button>

          </div>

        </div>

      )}

    </main>

  );

}