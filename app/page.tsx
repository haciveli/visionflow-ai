export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10">

        <h1 className="text-4xl font-extrabold">
          VisionFlow AI 🚀
        </h1>

        <div className="flex items-center gap-4">

          <button className="px-6 py-3 rounded-2xl bg-white/10">
            Login
          </button>

          <button className="px-6 py-3 rounded-2xl bg-white text-black font-bold">
            Get Started
          </button>

        </div>

      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-5 py-2 mb-8">

            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

            <span className="text-sm">
              AI Video Generation Platform
            </span>

          </div>

          <h1 className="text-7xl font-extrabold leading-tight mb-8">

            Create
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}AI Videos{" "}
            </span>
            In Seconds 🎬

          </h1>

          <p className="text-2xl text-white/60 mb-10 leading-relaxed">

            Generate cinematic AI videos, viral reels and futuristic content
            with next generation artificial intelligence.

          </p>

          <div className="flex flex-wrap gap-4">

            <button className="bg-white text-black px-8 py-5 rounded-3xl text-xl font-bold hover:scale-105 transition">

              🚀 Start Creating

            </button>

            <button className="bg-white/10 border border-white/10 px-8 py-5 rounded-3xl text-xl hover:bg-white/20 transition">

              ▶ Watch Demo

            </button>

          </div>

        </div>

        {/* HERO CARD */}
        <div className="relative">

          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-[120px] opacity-30" />

          <div className="relative bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl">

            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop"
              className="rounded-3xl mb-6"
            />

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-3xl font-bold">
                  Cyberpunk AI Scene
                </h3>

                <p className="text-white/60 mt-2">
                  Generated in 12 seconds
                </p>

              </div>

              <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold">
                Play
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-10 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">

            <div className="text-6xl mb-6">
              🎬
            </div>

            <h3 className="text-3xl font-bold mb-4">
              AI Video Creation
            </h3>

            <p className="text-white/60 text-lg leading-relaxed">
              Create cinematic videos with advanced artificial intelligence.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">

            <div className="text-6xl mb-6">
              ⚡
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Lightning Fast
            </h3>

            <p className="text-white/60 text-lg leading-relaxed">
              Generate viral AI content in seconds with optimized rendering.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">

            <div className="text-6xl mb-6">
              🌍
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Global Platform
            </h3>

            <p className="text-white/60 text-lg leading-relaxed">
              Create content for YouTube, TikTok, Instagram and more.
            </p>

          </div>

        </div>

      </section>

      {/* PRICING */}
      <section className="max-w-7xl mx-auto px-10 pb-32">

        <div className="text-center mb-16">

          <h2 className="text-6xl font-extrabold mb-6">
            Pricing 💎
          </h2>

          <p className="text-white/60 text-2xl">
            Choose your AI creation plan
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10">

            <h3 className="text-3xl font-bold mb-4">
              Starter
            </h3>

            <p className="text-6xl font-extrabold mb-8">
              $9
            </p>

            <ul className="space-y-4 text-white/70 text-lg">

              <li>✔ 20 AI Videos</li>
              <li>✔ HD Export</li>
              <li>✔ Fast Rendering</li>

            </ul>

            <button className="w-full mt-10 bg-white text-black py-4 rounded-2xl font-bold">
              Start Now
            </button>

          </div>

          <div className="bg-gradient-to-b from-blue-500 to-purple-600 rounded-[40px] p-10 scale-105 shadow-2xl shadow-purple-500/30">

            <div className="inline-block bg-white text-black px-4 py-2 rounded-full font-bold mb-6">
              MOST POPULAR
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Pro
            </h3>

            <p className="text-6xl font-extrabold mb-8">
              $29
            </p>

            <ul className="space-y-4 text-white text-lg">

              <li>✔ Unlimited Videos</li>
              <li>✔ 4K Export</li>
              <li>✔ AI Voice</li>
              <li>✔ Premium Templates</li>

            </ul>

            <button className="w-full mt-10 bg-white text-black py-4 rounded-2xl font-bold">
              Upgrade
            </button>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10">

            <h3 className="text-3xl font-bold mb-4">
              Enterprise
            </h3>

            <p className="text-6xl font-extrabold mb-8">
              $99
            </p>

            <ul className="space-y-4 text-white/70 text-lg">

              <li>✔ API Access</li>
              <li>✔ Team Accounts</li>
              <li>✔ Unlimited Rendering</li>

            </ul>

            <button className="w-full mt-10 bg-white text-black py-4 rounded-2xl font-bold">
              Contact Us
            </button>

          </div>

        </div>

      </section>

    </main>

  );

}