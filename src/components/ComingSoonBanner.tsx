const ComingSoonBanner = () => {
  return (
    <div className="relative w-full flex justify-center pt-32 pb-10 overflow-hidden">
      {/* BLUE CURTAIN BACKDROP */}
      <div className="absolute inset-0 pointer-events-none">
        {/* baza kurtyny */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1225] via-[#06102A] to-[#050A18]" />

        {/* fałdy kurtyny */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(56,189,248,0.10) 0px, rgba(56,189,248,0.04) 18px, rgba(2,132,199,0.10) 36px)",
          }}
        />

        {/* winieta / głębia */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.10),rgba(0,0,0,0.65)_70%)]" />
      </div>

      {/* SPOTLIGHTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* lewy reflektor */}
        <div
          className="absolute -top-10 -left-10 w-[520px] h-[520px] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 25% 20%, rgba(56,189,248,0.55), rgba(56,189,248,0.15) 35%, rgba(0,0,0,0) 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute -top-6 left-0 w-[520px] h-[380px] opacity-45"
          style={{
            background:
              "conic-gradient(from 220deg at 0% 0%, rgba(56,189,248,0.0), rgba(56,189,248,0.35), rgba(56,189,248,0.0) 40%)",
            filter: "blur(6px)",
            transform: "skewX(-10deg)",
          }}
        />

        {/* prawy reflektor */}
        <div
          className="absolute -top-10 -right-10 w-[520px] h-[520px] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 75% 20%, rgba(56,189,248,0.55), rgba(56,189,248,0.15) 35%, rgba(0,0,0,0) 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute -top-6 right-0 w-[520px] h-[380px] opacity-45"
          style={{
            background:
              "conic-gradient(from 320deg at 100% 0%, rgba(56,189,248,0.0), rgba(56,189,248,0.35), rgba(56,189,248,0.0) 40%)",
            filter: "blur(6px)",
            transform: "skewX(10deg)",
          }}
        />
      </div>

      {/* TEXT */}
      <div className="relative z-10 text-center">
        <div className="inline-block rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md px-10 py-6 shadow-2xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.75)]">
            Coming Soon
          </h1>

          {/* delikatne “światło spływające” po literach */}
          <div className="relative mt-1 h-[6px] w-full overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
