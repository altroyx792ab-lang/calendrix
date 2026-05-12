import { Helmet } from 'react-helmet-async';
import { Mail, Shield, Globe, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Helmet>
        <title>About & Contact | Calendrix</title>
        <meta name="description" content="Calendrix bridges the world's great traditions. Get in touch with our team." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About Calendrix</h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
          We believe time is universal, but its meaning is deeply personal and cultural. Calendrix bridges the world's great traditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Globe className="w-10 h-10 text-[var(--color-brand-accent)] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Inclusive Vision</h3>
          <p className="text-gray-400 text-sm">Built for believers and global citizens. We track what matters to you.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Clock className="w-10 h-10 text-[var(--color-brand-accent)] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Precision Data</h3>
          <p className="text-gray-400 text-sm">Real-time moon phases, global times, and accurate Hijri conversions.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Shield className="w-10 h-10 text-[var(--color-brand-accent)] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Privacy First</h3>
          <p className="text-gray-400 text-sm">Your countdowns and preferences stay securely on your device.</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Mail className="w-8 h-8 text-[var(--color-brand-accent)] mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold mb-2">Contact Us</h2>
            <p className="text-gray-400">Have feedback or want to request a feature? Reach out to The Calendrix Team.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white"
                  placeholder="hello@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white appearance-none">
                <option>General Inquiry</option>
                <option>Feature Request</option>
                <option>Report an Issue</option>
                <option>Business Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button type="submit" className="w-full py-4 bg-[var(--color-brand-accent)] text-black font-bold text-lg rounded-xl hover:bg-white hover:text-black transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
