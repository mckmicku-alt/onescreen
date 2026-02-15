const ComingSoonBanner = () => {
  const scrollDown = () => {
    const el = document.getElementById("content");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full pt-20 md:pt-24">
      <div className="relative mx-auto h-[92vh] min-h-[620px] max-w-6xl overflow-hidden px-6 flex items-center justify-center">
        {/* TEST: pokaż obraz bez overlay – musi być widoczny */}
        <img
          src="/hero-bg.png"
          alt="hero-bg-test"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-100"
        />

        {/* napis */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
            Coming&nbsp;Soon
          </h1>

          <button
            type="button"
            onClick={scrollDown}
            aria-label="Przewiń w dół"
            className="mt-10 inline-flex items-center justify-center transition-transform hover:scale-125 active:scale-110"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="opacity-95">
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
      </div>
    </section>
  );
};

export default ComingSoonBanner;
