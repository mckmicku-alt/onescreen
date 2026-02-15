const ComingSoonBanner = () => {
  return (
    <section className="relative w-full pt-20">
      {/* Tło jako część strony (bez żadnych boxów) */}
      <div className="relative h-[260px] w-full overflow-hidden">
        {/* obraz jako background */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/coming-soon-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            backgroundRepeat: "no-repeat",
            filter: "saturate(1.05) contrast(1.05) brightness(0.95)",
          }}
        />

        {/* winieta + blend */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.05), rgba(0,0,0,0.75) 70%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* maska: usuwa efekt prostokątnego obrazka */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 88%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 88%)",
          }}
        />

        {/* Lampy */}
        <img
          src="/lights/left-lamp.png"
          alt=""
          className="absolute -top-2 left-0 w-[34vw] max-w-[420px] select-none pointer-events-none opacity-95"
        />
        <img
          src="/lights/right-lamp.png"
          alt=""
          className="absolute -top-2 right-0 w-[34vw] max-w-[420px] select-none pointer-events-none opacity-95"
        />

        {/* Tekst na środku */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(80,150,255,0.55), rgba(0,0,0,0) 70%)",
              }}
            />
            <h1 className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
              Coming&nbsp;Soon
            </h1>
            <p className="relative mt-3 text-base md:text-lg text-white/80 max-w-2xl">
              OneScreen już wkrótce. Zapisz się do bety i bądź pierwszy.
            </p>
          </div>
        </div>

        {/* przejście do tła strony */}
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
