import React from "react";

const ComingSoonBanner = () => {
  return (
    <div className="relative w-full flex justify-center py-12">
      {/* Subtelne tło z rozmytym światłem */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[150px] rounded-full bg-accent/10 blur-[90px]" style={{ animationDelay: "1.2s" }}></div>
      </div>
      {/* Napis */}
      <h1 className="relative z-10 font-display text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 drop-shadow-md">
        COMING&nbsp;SOON
      </h1>
    </div>
  );
};

export default ComingSoonBanner;
