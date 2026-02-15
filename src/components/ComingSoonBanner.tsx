const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("content");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full pt-20 md:pt-24">
      {/* FULL WIDTH hero (bez max-w) */}
      <div className="relative h-[92vh] min-h-[620px] w-full overflow-hidden flex items-center justify-center px-6">
        {/* tło full width */}
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* filmowe przyciemnienie + winieta */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* subtelny niebieski glow w centrum */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(70,140,255,0.25) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* NAPIS + odbicie */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* główny napis z premium gradientem */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.78) 60%, rgba(255,255,255,0.95) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 18px 45px rgba(0,0,0,0.65)",
            }}
          >
            Coming&nbsp;Soon
          </h1>

          {/* odbicie (lustro) */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none -mt-2 opacity-35"
            style={{
              transform: "scaleY(-1)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(0.3px)",
            }}
          >
            <div
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 75%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 18px 45px rgba(0,0,0,0.35)",
              }}
            >
              Coming&nbsp;Soon
            </div>
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
          className="absolute inset-x-0 bottom-0 h-32 z-[3]"
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
