import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Upload, Users, Info, Zap, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileHomeNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Upload, label: 'Upload', path: '/upload' },
    { icon: Zap, label: 'Analyse', path: '/upload', isPrimary: true },
    { icon: Users, label: 'Portal', path: '/portal' },
    { icon: Info, label: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Collapsed mini view - just the Analyse button
  if (!isExpanded) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-foreground/80 text-background shadow-md text-xs font-medium"
        >
          <Zap className="h-3 w-3" />
          Menu
          <ChevronUp className="h-2.5 w-2.5" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 md:hidden bg-background/95 backdrop-blur-lg border border-border rounded-full shadow-lg px-1"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-0.5 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          if (item.isPrimary) {
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center mx-0.5"
              >
                <Icon className="h-4 w-4 text-primary-foreground" />
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                active 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
