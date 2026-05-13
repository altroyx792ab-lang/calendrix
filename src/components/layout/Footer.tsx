import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-bg)] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Calendrix Logo" className="h-6 w-6" />
              <span className="font-display font-semibold text-2xl tracking-wider text-white">CALENDRIX</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              A productivity and calendar management blog curated by Yahya Mughal. Bridging cultures and digital efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors"><Github size={20} /></a>
              <a href="mailto:altroyx792ab@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/calendar" className="hover:text-[var(--color-brand-accent)] transition-colors">Global Calendar</Link></li>
              <li><Link to="/events" className="hover:text-[var(--color-brand-accent)] transition-colors">Religious Events</Link></li>
              <li><Link to="/world-clock" className="hover:text-[var(--color-brand-accent)] transition-colors">World Clock</Link></li>
              <li><Link to="/moon-phases" className="hover:text-[var(--color-brand-accent)] transition-colors">Moon Phases</Link></li>
              <li><Link to="/age-calculator" className="hover:text-[var(--color-brand-accent)] transition-colors">Age Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/blog" className="hover:text-[var(--color-brand-accent)] transition-colors">Blog & Insights</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-brand-accent)] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-brand-accent)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Calendrix. All rights reserved by Yahya Mughal.</p>
          <p className="mt-2 md:mt-0">Professional Vibe Coding & Productivity Insights.</p>
        </div>
      </div>
    </footer>
  );
}
