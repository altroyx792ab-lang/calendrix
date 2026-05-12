import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Moon, Info } from 'lucide-react';

export default function MoonPhases() {
  const [phase, setPhase] = useState(0);
  const [illumination, setIllumination] = useState(0);
  const [phaseName, setPhaseName] = useState('');

  // Very simplified moon phase calculation based on Julian dates
  // A complete lunar cycle is 29.53058867 days
  useEffect(() => {
    const calcMoonPhase = () => {
      const date = new Date();
      // Known new moon: Jan 11, 2024, ~11:57 UTC
      const knownNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57, 0)).getTime();
      const now = date.getTime();
      const lunarDays = 29.53058867;
      const lunarMs = lunarDays * 24 * 60 * 60 * 1000;
      
      const diff = now - knownNewMoon;
      const currentPhaseCycle = (diff % lunarMs) / lunarMs; // 0 to 1
      
      setPhase(currentPhaseCycle);
      
      // Calculate illumination percentage
      // Illumination is 0 at phase 0, 100 at 0.5, 0 at 1
      const illum = Math.round((1 - Math.cos(currentPhaseCycle * 2 * Math.PI)) / 2 * 100);
      setIllumination(illum);

      // Name the phase
      if (currentPhaseCycle < 0.03 || currentPhaseCycle > 0.97) setPhaseName("New Moon");
      else if (currentPhaseCycle < 0.22) setPhaseName("Waxing Crescent");
      else if (currentPhaseCycle < 0.28) setPhaseName("First Quarter");
      else if (currentPhaseCycle < 0.47) setPhaseName("Waxing Gibbous");
      else if (currentPhaseCycle < 0.53) setPhaseName("Full Moon");
      else if (currentPhaseCycle < 0.72) setPhaseName("Waning Gibbous");
      else if (currentPhaseCycle < 0.78) setPhaseName("Last Quarter");
      else setPhaseName("Waning Crescent");
    };

    calcMoonPhase();
    const interval = setInterval(calcMoonPhase, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Generate an SVG path for the moon based on phase
  // Phase 0.0 -> 1.0. 0.5 is full moon.
  // We use SVG arcs to draw the terminator line
  const d = phase < 0.5 
    ? `M 100, 0 A 100,100 0 0,0 100,200 A ${100 - (phase * 400)},100 0 0,1 100,0` 
    : `M 100, 0 A 100,100 0 0,1 100,200 A ${(phase - 0.5) * 400 - 100},100 0 0,1 100,0`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <Helmet>
        <title>Live Moon Phases | Calendrix</title>
        <meta name="description" content="Track the current moon phase, illumination, and planetary details essential for lunar calendars." />
      </Helmet>

      <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Celestial Tracker</h1>
      <p className="text-gray-400 mb-16">The lunar cycle is the foundation of the Islamic calendar and shapes festivals globally.</p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
        
        {/* Moon Visualizer */}
        <div className="relative w-64 h-64 shrink-0 rounded-full bg-black overflow-hidden shadow-[0_0_50px_rgba(200,210,230,0.1)] border border-white/5">
          {/* Base full moon texture (dimmed for dark side) */}
          <div className="absolute inset-0 bg-gray-800 opacity-20"></div>
          
          {/* Lit portion SVG */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-gray-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <defs>
              <radialGradient id="moonGlow" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
              </radialGradient>
            </defs>
            <path d={d} fill="url(#moonGlow)" />
          </svg>
        </div>

        <div className="text-left flex-1">
          <div className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] font-medium mb-2 uppercase tracking-widest text-sm">
            <Moon size={16} /> Live Data
          </div>
          <h2 className="text-4xl font-display font-bold mb-2">{phaseName}</h2>
          <p className="text-2xl text-gray-300 font-mono mb-8">{illumination}% Illuminated</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <span className="text-sm text-gray-500 block mb-1">Cycle Progress</span>
              <span className="font-mono text-lg">{(phase * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <span className="text-sm text-gray-500 block mb-1">Moon Age</span>
              <span className="font-mono text-lg">{(phase * 29.53).toFixed(1)} Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-[var(--color-brand-islamic)]/10 border border-[var(--color-brand-islamic)]/30 rounded-2xl flex gap-4 text-left">
        <Info className="shrink-0 text-[var(--color-brand-islamic)]" />
        <div>
          <h4 className="font-semibold text-white mb-1">Islamic Significance</h4>
          <p className="text-sm text-gray-300">
            The Islamic (Hijri) calendar is entirely lunar-based. A new month officially begins upon the confirmed sighting of the Hilal (the waxing crescent moon) following a new moon. This governs the start of Ramadan, Eid al-Fitr, and Hajj.
          </p>
        </div>
      </div>
    </div>
  );
}
