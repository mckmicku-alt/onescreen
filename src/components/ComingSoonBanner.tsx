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
            filter: "contrast(1.03) saturate(1.04)",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.58) 62%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Subtle center glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-65"
          style={{
            background:
              "radial-gradient(ellipse at 50% 56%, rgba(110,140,255,0.12) 0%, rgba(80,60,255,0.09) 28%, rgba(0,0,0,0) 72%)",
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

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[4] h-[48vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 12%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.72) 78%, hsl(var(--background)) 100%)",
          }}
        />

        {/* Soft fog blur */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[5] h-[34vh] opacity-95"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.35) 55%, hsl(var(--background)) 100%)",
            filter: "blur(26px)",
            transform: "scaleY(1.18)",
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
