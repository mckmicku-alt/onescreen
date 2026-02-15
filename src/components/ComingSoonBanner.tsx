const ComingSoonBanner = () => {
  return (
    <div className="relative w-full flex justify-center pt-32 pb-10">
      {/* Subtelne światła w stylu strony */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[240px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute top-40 right-24 w-[380px] h-[180px] rounded-full bg-accent/10 blur-[110px]" />
      </div>

      {/* Tekst: biały z delikatnym niebieskim “spływającym” światłem */}
      <h1 className="relative z-10 font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-white to-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.55)]">
        COMING&nbsp;SOON
      </h1>
    </div>
  );
};

export default ComingSoonBanner;
