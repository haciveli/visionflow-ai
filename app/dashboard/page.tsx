"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [prompt, setPrompt] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {

    const savedHistory =
      localStorage.getItem("history");

    if (savedHistory) {

      setHistory(JSON.parse(savedHistory));

    }

  }, []);

  const generateImage = async () => {

    if (!prompt) return;

    setLoading(true);

    setImage("");

    try {

      const response = await fetch(
        "/api/generate-image",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            prompt,

          }),

        }
      );

      const data = await response.json();

      console.log("AI RESPONSE:", data);

      if (data.image) {

        setImage(data.image);

        const newItem = {

          type: "image",

          url: data.image,

          prompt,

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

        alert(
          data.error ||
            "Görsel oluşturulamadı"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Hata oluştu");

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white p-5">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <h1 className="text-5xl font-bold">
              VisionFlow 🚀
            </h1>

            <p className="text-gray-400 mt-2">
              AI Görsel Oluşturucu
            </p>

          </div>

        </div>

        <div className="mt-10 bg-[#111] border border-gray-800 rounded-[30px] p-6">

          <textarea

            value={prompt}

            onChange={(e) =>
              setPrompt(e.target.value)
            }

            placeholder="Bir prompt yaz..."

            className="w-full h-40 bg-black border border-gray-700 rounded-2xl p-5 text-white outline-none resize-none"

          />

          <button

            onClick={generateImage}

            disabled={loading}

            className="mt-5 bg-white text-black font-bold px-8 py-4 rounded-2xl w-full"

          >

            {loading
              ? "Oluşturuluyor..."
              : "🎨 Görsel Oluştur"}

          </button>

        </div>

        {image && (

          <div className="mt-10">

            <img

              src={image}

              alt="AI"

              className="w-full rounded-[30px] border border-gray-800"

            />

          </div>

        )}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-5">
            Geçmiş 🚀
          </h2>

          {history.length === 0 && (

            <div className="bg-[#111] border border-gray-800 rounded-[30px] p-10 text-center text-gray-400">

              Henüz içerik yok

            </div>

          )}

          <div className="grid md:grid-cols-3 gap-5">

            {history.map((item, index) => (

              <div

                key={index}

                className="bg-[#111] border border-gray-800 rounded-[30px] overflow-hidden"

              >

                <img

                  src={item.url}

                  alt="history"

                  className="w-full h-64 object-cover"

                />

                <div className="p-4">

                  <p className="text-sm text-gray-300">

                    {item.prompt}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );

}