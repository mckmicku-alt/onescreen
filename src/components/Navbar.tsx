const BETA_LOCK = import.meta.env.VITE_BETA_LOCK === "true";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          <span className="text-foreground">One</span>
          <span className="text-primary neon-text">Screen</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/browse"
            className={`text-sm font-medium transition-colors ${pathname.startsWith("/browse") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            Przeglądaj
          </Link>
          <Link
            to="/settings"
            className={`text-sm font-medium transition-colors ${pathname.startsWith("/settings") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            Platformy
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
