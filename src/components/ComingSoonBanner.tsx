const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("content");
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
          className="absolute inset-x-0 top-0 h-40 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,18,32,1) 0%, rgba(11,18,32,0.4) 60%, rgba(11,18,32,0) 100%)",
          }}
        />

        {/* CINEMATIC VIGNETTE */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* PREMIUM CENTER GLOW */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(110,140,255,0.18) 0%, rgba(80,60,255,0.12) 30%, rgba(0,0,0,0) 65%)",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24">

          {/* PREMIUM STREAMING TITLE */}
          <h1
            className="font-black uppercase tracking-tight"
            style={{
              fontSize: "clamp(70px, 9vw, 130px)",
              letterSpacing: "0.04em",
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #dbe6ff 40%, #8fa8ff 70%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow:
                "0 50px 110px rgba(0,0,0,0.85), 0 0 60px rgba(80,120,255,0.35)",
            }}
          >
            COMING&nbsp;SOON
          </h1>

          {/* SUBTLE REFLECTION */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none opacity-25 mt-2"
            style={{
              transform: "scaleY(-1)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0) 80%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0) 80%)",
              filter: "blur(1px)",
            }}
          >
            <div
              className="font-black uppercase tracking-tight"
              style={{
                fontSize: "clamp(70px, 9vw, 130px)",
                letterSpacing: "0.04em",
                backgroundImage:
                  "linear-gradient(180deg, rgba(200,215,255,0.5) 0%, rgba(200,215,255,0.1) 85%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              COMING&nbsp;SOON
            </div>
          </div>

          {/* ARROW – NIŻEJ */}
          <button
            type="button"
            onClick={scrollDown}
            aria-label="Scroll down"
            className="mt-20 md:mt-24 transition-transform hover:scale-125 active:scale-110"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
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

        {/* BOTTOM FADE TO NEXT SECTION */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-56 z-[3]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(11,18,32,0.6) 40%, rgba(11,18,32,1) 100%)",
          }}
        />

      </div>
    </section>
  );
};

export default ComingSoonBanner;
