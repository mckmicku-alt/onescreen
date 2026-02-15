const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("content");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full">
      {/* Hero od samej góry (bez pt-20), żeby nie było “krawędzi” */}
      <div className="relative h-[100vh] min-h-[680px] w-full overflow-hidden flex items-center justify-center">
        {/* tło */}
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            imageRendering: "auto",
            filter: "contrast(1.08) saturate(1.08)",
            transform: "scale(1.02)",
          }}
        />

        {/* winieta + filmowe przyciemnienie */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        {/* subtelny “grain” dla premium (bez rozmycia) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
            mixBlendMode: "overlay",
          }}
        />

        {/* delikatny niebieski glow pod tytułem */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(70,140,255,0.22) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* content – odsunięty od góry przez padding, ale hero full */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 md:pt-28">
          {/* “wychyla się z cienia” – mocniejszy lift + połysk */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.78) 55%, rgba(255,255,255,0.98) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow:
                "0 30px 70px rgba(0,0,0,0.75), 0 2px 0 rgba(0,0,0,0.15)",
              transform: "translateY(-2px)",
            }}
          >
            Coming&nbsp;Soon
          </h1>

          {/* kałuża: odbicie + “mokry highlight” + ripple mask */}
          <div className="relative mt-2">
            {/* odbicie tekstu */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none opacity-35"
              style={{
                transform: "scaleY(-1)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0) 75%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0) 75%)",
                filter: "blur(0.6px)",
              }}
            >
              <div
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.10) 80%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Coming&nbsp;Soon
              </div>
            </div>

            {/* mokry połysk jak na kałuży */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-7 h-14 w-[22rem] -translate-x-1/2 opacity-40 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(180,220,255,0.45) 0%, rgba(0,0,0,0) 70%)",
              }}
            />
          </div>

          {/* strzałka */}
          <button
            type="button"
            onClick={scrollDown}
            aria-label="Przewiń w dół"
            className="mt-8 inline-flex items-center justify-center transition-transform hover:scale-125 active:scale-110"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="opacity-95">
              <path
                d="M6 9l6 6 6-6"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* blend do reszty strony */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 z-[4]"
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
