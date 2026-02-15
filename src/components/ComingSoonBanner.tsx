const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("beta");
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
            transform: "scale(1.05)",
            filter: "contrast(1.04) saturate(1.05)",
          }}
        />

        {/* CINEMATIC VIGNETTE */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.62) 62%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* SOFT CENTER GLOW */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(110,140,255,0.14) 0%, rgba(80,60,255,0.10) 30%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* TOP FADE (żeby nie było krawędzi u góry) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-[2] h-44"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,18,32,1) 0%, rgba(11,18,32,0.45) 55%, rgba(11,18,32,0) 100%)",
          }}
        />

        {/* CONTENT (bez napisu) */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">
          {/* Strzałka na dole ekranu (niżej niż wcześniej) */}
          <button
            type="button"
            onClick={scrollDown}
            aria-label="Przewiń do zapisu na betę"
            className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 transition-transform hover:scale-125 active:scale-110 opacity-95"
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

        {/* WOW FADE OUT: miękkie zanikanie obrazu do tła strony */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[3] h-[38vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,18,32,0) 0%, rgba(11,18,32,0.10) 18%, rgba(11,18,32,0.35) 45%, rgba(11,18,32,0.70) 75%, rgba(11,18,32,1) 100%)",
          }}
        />

        {/* Dodatkowy blur-layer tylko na dole (efekt rozmytego przejścia) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-[26vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,18,32,0) 0%, rgba(11,18,32,0.55) 55%, rgba(11,18,32,1) 100%)",
            filter: "blur(18px)",
            transform: "scaleY(1.12)",
            opacity: 0.9,
          }}
        />
      </div>
    </section>
  );
};

export default ComingSoonBanner;
