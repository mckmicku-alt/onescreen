const ComingSoonBanner = () => {
  return (
    <section className="relative w-full pt-16 md:pt-20">
      <div className="relative h-[520px] md:h-[620px] w-full overflow-hidden">
        {/* Tło: czyste, filmowe — bez obrazka (żeby nie było kwadratów) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(60,120,255,0.25), rgba(0,0,0,0) 55%), linear-gradient(to bottom, rgba(0,0,0,0.80), rgba(0,0,0,0.92))",
          }}
        />

        {/* Lampy */}
        <img
          src="/lights/left-lamp.png"
          alt=""
          className="pointer-events-none select-none absolute -top-10 left-[-6%] w-[44vw] max-w-[520px] opacity-85"
          style={{ filter: "blur(0.2px) saturate(1.05)" }}
        />
        <img
          src="/lights/right-lamp.png"
          alt=""
          className="pointer-events-none select-none absolute -top-10 right-[-6%] w-[44vw] max-w-[520px] opacity-85"
          style={{ filter: "blur(0.2px) saturate(1.05)" }}
        />

        {/* Subtelna winieta (premium) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Napis: sam, na środku */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="relative">
            {/* Glow pod tekstem */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-48 w-[32rem] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(90,160,255,0.55) 0%, rgba(0,0,0,0) 70%)",
              }}
            />
            <h1 className="relative text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
              Coming&nbsp;Soon
            </h1>
          </div>
        </div>

        {/* blend do tła strony */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24"
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
