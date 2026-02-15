const ComingSoonBanner = () => {
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

        {/* Subtelny glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-75"
          style={{
            background:
              "radial-gradient(ellipse at 50% 58%, rgba(110,140,255,0.16) 0%, rgba(80,60,255,0.10) 30%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Top fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-[3] h-44"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Bottom fade (płynniej) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-[48vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.78) 82%, hsl(var(--background)) 100%)",
          }}
        />

        {/* Mgła/blur */}
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
      </div>
    </section>
  );
};

export default ComingSoonBanner;
