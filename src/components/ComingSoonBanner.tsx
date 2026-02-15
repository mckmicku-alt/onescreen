const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full pt-20 md:pt-24">
      <div className="relative mx-auto flex h-[70vh] min-h-[520px] max-w-6xl items-center justify-center px-6">
        {/* tło – czysty, filmowy gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(40,120,255,0.30), rgba(2,6,23,1) 65%)",
          }}
        />
        {/* dodatkowe przyciemnienie brzegów */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* lampy jako osobne obrazy */}
        <img
          src="/lights/left-lamp.png"
          alt=""
          className="pointer-events-none select-none absolute -top-10 left-[-6%] w-[38vw] max-w-[420px] opacity-85"
          style={{ filter: "saturate(1.1) contrast(1.05)" }}
        />
        <img
          src="/lights/right-lamp.png"
          alt=""
          className="pointer-events-none select-none absolute -top-10 right-[-6%] w-[38vw] max-w-[420px] opacity-85"
          style={{ filter: "saturate(1.1) contrast(1.05)" }}
        />

        {/* główny kontent */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* subtelny glow pod tytułem */}
          <div
            aria-hidden="true"
            className="absolute -top-10 left-1/2 h-40 w-[26rem] -translate-x-1/2 blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle, rgba(80,150,255,0.65), rgba(0,0,0,0) 70%)",
            }}
          />

          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
            Coming&nbsp;Soon
          </h1>

          {/* interaktywna strzałka */}
          <button
            type="button"
            onClick={scrollDown}
            aria-label="Przewiń w dół"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-white/18 bg-white/6 p-4 backdrop-blur-md transition-transform transition-colors hover:scale-110 hover:bg-white/12 active:scale-105"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-95"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* miękkie przejście do reszty strony */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-10"
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
