import { NavLink, Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Calendar as CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', newTheme);
  };

  const navLinks = [
    { name: 'Calendar', path: '/calendar' },
    { name: 'Events', path: '/events' },
    { name: 'Moon', path: '/moon-phases' },
    { name: 'World Clock', path: '/world-clock' },
    { name: 'Countdown', path: '/countdown' },
    { name: 'Age Calculator', path: '/age-calculator' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-[var(--color-brand-bg)]/80 backdrop-blur-md shadow-none border-b border-white/5 py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-[var(--color-brand-accent)] bg-white/5 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <CalendarIcon size={24} />
            </div>
            <span className="font-display font-semibold text-2xl tracking-wider text-white">CALENDRIX</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-[var(--color-brand-accent)]',
                    isActive ? 'text-[var(--color-brand-accent)]' : 'text-gray-300'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {isAdmin && (
              <NavLink to="/admin" className="text-sm font-medium text-[var(--color-brand-islamic)]">
                Admin
              </NavLink>
            )}

            {user ? (
              <Link to="/auth" className="text-sm font-medium px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                Profile
              </Link>
            ) : (
              <Link to="/auth" className="text-sm font-medium px-4 py-2 bg-[var(--color-brand-accent)] text-black rounded-lg hover:bg-white transition-colors">
                Sign In
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 w-full bg-[var(--color-brand-bg)]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden',
          mobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        )}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'text-lg font-medium transition-colors',
                  isActive ? 'text-[var(--color-brand-accent)]' : 'text-gray-300'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-islamic)]">
              Admin
            </NavLink>
          )}

          {user ? (
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium px-4 py-3 bg-white/10 rounded-xl text-center inline-block">
              Profile
            </Link>
          ) : (
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium px-4 py-3 bg-[var(--color-brand-accent)] text-black rounded-xl text-center inline-block">
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
