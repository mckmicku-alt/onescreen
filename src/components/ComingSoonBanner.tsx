const ComingSoonBanner = () => {
  return (
    <section className="relative w-full pt-20">
      {/* Tło jako część strony (bez żadnych boxów) */}
      <div className="relative h-[220px] w-full overflow-hidden">
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

        {/* winieta + blend, żeby “wlało się” w stronę */}
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

        {/* płynne przejście do tła strony na dole */}
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
