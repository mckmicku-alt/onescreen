const ComingSoonBanner = () => {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full">
      <div className="relative h-[100vh] min-h-[720px] w-full overflow-hidden flex items-center justify-center bg-[#0B1220]">
        {/* BACKGROUND IMAGE */}
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            transform: "scale(1.04)",
            filter: "contrast(1.05) saturate(1.05)",
          }}
        />

        {/* TOP BLEND (ukrywa krawędź przy navbarze) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,18,32,1) 0%, rgba(11,18,32,0.55) 55%, rgba(11,18,32,0) 100%)",
          }}
        />

        {/* CINEMATIC VIGNETTE */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.60) 62%, rgba(0,0,0,0.94) 100%)",
          }}
        />

        {/* PREMIUM CENTER GLOW */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(110,140,255,0.16) 0%, rgba(80,60,255,0.10) 30%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* HERO CONTENT (bez napisu) */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24">
          {/* strzałka w dół do pierwszej sekcji */}
          <button
            type="button"
            onClick={() => scrollToId("content")}
            aria-label="Przewiń w dół"
            className="mt-44 md:mt-56 transition-transform hover:scale-125 active:scale-110"
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="white"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />
            </svg>
          </button>
        </div>

        {/* BOTTOM FADE (płynne + rozmyte) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[3] h-72"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(11,18,32,0.35) 35%, rgba(11,18,32,0.75) 70%, rgba(11,18,32,1) 100%)",
            filter: "blur(10px)",
            transform: "scaleY(1.08)",
          }}
        />

        {/* drugi blend na wierzchu (bez blur) żeby nie było brzydkiej kreski */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(11,18,32,0.65) 60%, rgba(11,18,32,1) 100%)",
          }}
        />

        {/* NAV: strzałki do sekcji po prawej (tymczasowo) */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[20] flex flex-col gap-3">
          <button
            onClick={() => scrollToId("content")}
            className="opacity-70 hover:opacity-100 transition"
            aria-label="Sekcja 1"
            title="Sekcja 1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollToId("hero")}
            className="opacity-70 hover:opacity-100 transition"
            aria-label="Hero"
            title="Hero"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollToId("how")}
            className="opacity-70 hover:opacity-100 transition"
            aria-label="Jak to działa"
            title="Jak to działa"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollToId("cta")}
            className="opacity-70 hover:opacity-100 transition"
            aria-label="Beta"
            title="Beta"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonBanner;
