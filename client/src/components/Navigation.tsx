import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Custom hook to handle scroll to top on route change
function useScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);
}

export function Navigation() {
  useScrollToTop(); // Add scroll to top on route change
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", section: null },
    { path: "/#about", label: "About Us", section: "about" },
    { path: "/join", label: "Join Us", section: null },
    { path: "/gallery", label: "Gallery", section: null },
    { path: "/contact", label: "Contact", section: null },
  ];

  const isActive = (path: string, section: string | null = null) => {
    // If we're checking for a section link
    if (section) {
      return window.location.hash === `#${section}`;
    }
    // For home page without hash
    if (path === "/") return location === path && !window.location.hash;
    // For other paths
    return location.startsWith(path);
  };

  const handleNavClick = (path: string, section: string | null, e: React.MouseEvent) => {
    // If it's the About Us link and we're not already on the home page
    if (section === 'about' && !location.startsWith('/')) {
      e.preventDefault();
      window.location.href = `/${path}`;
      return;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="w-full px-6 md:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home" className="flex items-center space-x-3 hover-elevate active-elevate-2 rounded-md py-1">
            <img 
              src="/favicon.jpg" 
              alt="Skiline Logo" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
            />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Skiline <span className="text-primary">Recruitment</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            {navLinks.map((link) => (
              <NavLink 
                key={link.label}
                link={link}
                isActive={isActive(link.path, link.section)}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-2" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <NavLink 
                key={link.label}
                link={link}
                isActive={isActive(link.path)}
                isMobile={true}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  link: { path: string; label: string; section: string | null };
  isActive: boolean;
  isMobile?: boolean;
  onClick: () => void;
}

function NavLink({ link, isActive, isMobile = false, onClick }: NavLinkProps) {
  const navigate = useCallback((path: string, section: string | null = null) => {
    if (section) {
      // If we're already on the home page, update hash and scroll to section
      if (window.location.pathname === '/' || window.location.pathname === '') {
        window.history.pushState(null, '', `#${section}`);
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Force update the active state
        window.dispatchEvent(new Event('hashchange'));
      } else {
        // If not on home page, navigate to home with hash
        window.location.href = `/#${section}`;
      }
    } else {
      // Regular navigation
      if (path === '/' && window.location.pathname === '/') {
        // If already on home page, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        window.dispatchEvent(new Event('hashchange'));
      } else {
        window.location.href = path;
      }
    }
  }, []);
  const className = isMobile 
    ? `block px-4 py-3 text-lg font-medium rounded-md transition-colors hover-elevate active-elevate-2 ${
        isActive ? "bg-primary/10 text-primary" : "text-foreground"
      }`
    : `px-4 py-2 text-lg font-medium rounded-md transition-colors hover-elevate active-elevate-2 ${
        isActive ? "bg-primary/10 text-primary" : "text-foreground"
      }`;

  const scrollToSection = useCallback((sectionId: string | null) => {
    if (!sectionId) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
    navigate(link.path, link.section);
  }, [link.path, link.section, onClick, navigate]);

  return (
    <a
      href={link.section ? `#${link.section}` : link.path}
      onClick={handleClick}
      data-testid={`link-${isMobile ? 'mobile-' : ''}nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
      className={className}
    >
      {link.label}
    </a>
  );
}
