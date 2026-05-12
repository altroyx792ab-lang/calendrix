import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showStats) {
      interval = setInterval(() => setNow(new Date().getTime()), 1000);
    }
    return () => clearInterval(interval);
  }, [showStats]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) setShowStats(true);
  };

  const renderStats = () => {
    const birthDate = new Date(dob);
    const currentDate = new Date(now);

    const exactYears = differenceInYears(currentDate, birthDate);
    const dateAfterYears = new Date(birthDate);
    dateAfterYears.setFullYear(birthDate.getFullYear() + exactYears);
    const exactMonths = differenceInMonths(currentDate, dateAfterYears);
    const dateAfterMonths = new Date(dateAfterYears);
    dateAfterMonths.setMonth(dateAfterMonths.getMonth() + exactMonths);
    const exactDays = differenceInDays(currentDate, dateAfterMonths);

    // Total stats
    const totalMs = currentDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMs / (1000 * 60));
    const totalSeconds = Math.floor(totalMs / 1000);

    const heartbeats = totalDays * 100800; // rough avg
    const sleepHours = totalDays * 8; // rough avg

    return (
      <div className="mt-12 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="glass-card p-8 rounded-3xl text-center mb-8 border border-[var(--color-brand-accent)]/30">
          <h2 className="text-xl text-gray-400 mb-2">Exact Age</h2>
          <div className="text-4xl md:text-5xl font-display font-bold">
            <span className="text-[var(--color-brand-accent)]">{exactYears}</span> years,{' '}
            <span className="text-[var(--color-brand-accent)]">{exactMonths}</span> months,{' '}
            <span className="text-[var(--color-brand-accent)]">{exactDays}</span> days
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Days Lived', val: totalDays.toLocaleString(), icon: '📅' },
            { label: 'Hours Lived', val: totalHours.toLocaleString(), icon: '⏰' },
            { label: 'Minutes Lived', val: totalMinutes.toLocaleString(), icon: '⏱️' },
            { label: 'Seconds Lived (Live)', val: totalSeconds.toLocaleString(), icon: '⚡' },
            { label: 'Appx. Heartbeats', val: heartbeats.toLocaleString(), icon: '💖' },
            { label: 'Hours Slept', val: sleepHours.toLocaleString(), icon: '😴' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-center text-center">
              <span className="text-3xl mb-2">{stat.icon}</span>
              <span className="text-gray-400 text-sm mb-1">{stat.label}</span>
              <span className="font-mono text-2xl font-bold">{stat.val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
      <Helmet>
        <title>Age Calculator | Calendrix</title>
      </Helmet>

      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Chronicle of You</h1>
        <p className="text-lg text-gray-400">Enter your date of birth to reveal the exact mathematical reality of your time on earth.</p>
      </div>

      <form onSubmit={handleCalculate} className="w-full max-w-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
        <label className="block text-sm font-medium text-gray-300 mb-2 text-center">Date of Birth</label>
        <input 
          type="date" 
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white text-lg text-center mb-6"
        />
        <button type="submit" className="w-full py-4 bg-[var(--color-brand-accent)] text-black font-bold text-lg rounded-xl hover:bg-white transition-colors duration-300">
          Calculate My Life
        </button>
      </form>

      {showStats && renderStats()}
    </div>
  );
}
