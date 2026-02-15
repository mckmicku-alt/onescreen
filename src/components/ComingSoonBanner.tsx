const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("intro");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full">
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

        {/* Subtelny glow (premium) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-75"
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(110,140,255,0.16) 0%, rgba(80,60,255,0.10) 30%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Top fade pod nav */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-[3] h-44"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* BOTTOM FADE — płynniejsze, dłuższe, “wow” */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-[48vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.78) 82%, hsl(var(--background)) 100%)",
          }}
        />

        {/* Mgła/blur tylko na dole + maska żeby nie robiło “kreski” */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[5] h-[34vh] opacity-90"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, hsl(var(--background)) 100%)",
            filter: "blur(18px)",
            transform: "scaleY(1.12)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,1) 100%)",
          }}
        />

        {/* Strzałka w HERO (na dole ekranu, responsywnie) */}
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Przewiń do następnej sekcji"
          className="absolute left-1/2 -translate-x-1/2 z-[10] transition-transform hover:scale-125 active:scale-110 opacity-95"
          style={{
            bottom: "clamp(22px, 4.2vh, 56px)",
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="white"
              strokeWidth="2.8"
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
