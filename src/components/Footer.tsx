const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="text-foreground">One</span>
          <span className="text-primary">Screen</span>
        </a>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-foreground transition-colors">Kontakt</a>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 OneScreen
        </p>
      </div>
    </footer>
  );
};

export default Footer;
