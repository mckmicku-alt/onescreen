const ComingSoonBanner = () => {
  return (
    <section className="relative w-full pt-16 md:pt-20">
      {/* HERO wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/coming-soon-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 22%",
            backgroundRepeat: "no-repeat",
            filter: "saturate(1.05) contrast(1.08) brightness(0.82)",
            transform: "scale(1.02)",
          }}
        />

        {/* Cinematic overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(70,140,255,0.35), rgba(0,0,0,0) 60%)",
            mixBlendMode: "screen",
            opacity: 0.8,
          }}
        />

        {/* Height + content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          {/* Lamps */}
          <img
            src="/lights/left-lamp.png"
            alt=""
            className="pointer-events-none select-none absolute -top-6 left-[-4%] w-[38vw] max-w-[460px] opacity-80 blur-[0.2px]"
          />
          <img
            src="/lights/right-lamp.png"
            alt=""
            className="pointer-events-none select-none absolute -top-6 right-[-4%] w-[38vw] max-w-[460px] opacity-80 blur-[0.2px]"
          />

          {/* Center copy */}
          <div className="relative z-10 text-center">
            {/* Glow behind title */}
            <div
              aria-hidden="true"
              className="mx-auto mb-6 h-24 w-72 md:h-28 md:w-[26rem] blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(90,160,255,0.75) 0%, rgba(0,0,0,0) 65%)",
              }}
            />

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              Coming&nbsp;Soon
            </h1>

            <p className="mt-4 mx-auto max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
              OneScreen – wszystkie streamingi w jednym miejscu. Wyszukuj, odkrywaj i
              zapisuj do watchlisty. Start bety już wkrótce.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="#signup"
                className="inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition"
              >
                Dołącz do bety
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white/85 hover:text-white transition"
              >
                Jak to działa
              </a>
            </div>
          </div>
        </div>

        {/* Blend to page background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, hsl(var(--background)) 100%)",
          }}
        />
      </div>
    </section>
  );
};

export default ComingSoonBanner;
