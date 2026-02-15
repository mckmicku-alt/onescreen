const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("hero");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full">
      {/* Full-bleed hero */}
      <div className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-background">
        {/* BG */}
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            transform: "scale(1.05)",
            filter: "contrast(1.04) saturate(1.05)",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.60) 62%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Subtle center glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(110,140,255,0.14) 0%, rgba(80,60,255,0.10) 30%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Top fade (ukrywa krawędź pod navem) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-[3] h-44"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Bottom fade -> kolor strony (PŁYNNY + ROZMYTY) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-[44vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.70) 75%, hsl(var(--background)) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[5] h-[30vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 55%, hsl(var(--background)) 100%)",
            filter: "blur(22px)",
            transform: "scaleY(1.15)",
            opacity: 0.95,
          }}
        />

        {/* Arrow fixed to bottom */}
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Przewiń do kolejnej sekcji"
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-[10] transition-transform hover:scale-125 active:scale-110 opacity-95"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="white"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ComingSoonBanner;
