const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-extrabold tracking-tight text-white"
          >
            One<span className="text-primary">Screen</span>
          </a>

          {/* Pusta prawa strona – bez linków typu Przeglądaj/Platformy */}
          <div className="w-16" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
