import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sun, MoonStar, Plus, X } from 'lucide-react';

interface CityClock {
  id: string;
  name: string;
  country: string;
  timezone: string;
}

const DEFAULT_CITIES: CityClock[] = [
  { id: '1', name: 'Karachi', country: '🇵🇰', timezone: 'Asia/Karachi' },
  { id: '2', name: 'Mecca', country: '🇸🇦', timezone: 'Asia/Riyadh' },
  { id: '3', name: 'London', country: '🇬🇧', timezone: 'Europe/London' },
  { id: '4', name: 'New York', country: '🇺🇸', timezone: 'America/New_York' },
  { id: '5', name: 'Tokyo', country: '🇯🇵', timezone: 'Asia/Tokyo' },
  { id: '6', name: 'Sydney', country: '🇦🇺', timezone: 'Australia/Sydney' },
];

export default function WorldClock() {
  const [time, setTime] = useState(new Date());
  const [cities, setCities] = useState<CityClock[]>(DEFAULT_CITIES);

  useEffect(() => {
    // Restore from local storage later if needed.
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isDaytime = (date: Date, timezone: string) => {
    const hour = parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false,
    }).format(date), 10);
    return hour >= 6 && hour < 18;
  };

  const removeCity = (id: string) => {
    setCities(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>World Clock | Calendrix</title>
        <meta name="description" content="View real-time clocks for multiple cities around the world simultaneously." />
      </Helmet>

      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Global Sync</h1>
          <p className="text-gray-400">Time across cultures and continents.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium">
          <Plus size={16} /> Add City
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map(city => {
          const isDay = isDaytime(time, city.timezone);
          return (
             <div key={city.id} className="glass-card rounded-2xl p-6 relative overflow-hidden group">
               <button 
                 onClick={() => removeCity(city.id)}
                 className="absolute top-4 right-4 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <X size={16} />
               </button>
               
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="text-xl font-semibold flex items-center gap-2">
                     {city.country} {city.name}
                   </h3>
                   <p className="text-sm text-gray-400 mt-1">{formatDate(time, city.timezone)}</p>
                 </div>
                 <div className={`p-2 rounded-full ${isDay ? 'bg-sky-500/20 text-sky-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                   {isDay ? <Sun size={24} /> : <MoonStar size={24} />}
                 </div>
               </div>

               <div className="font-mono text-4xl font-bold tracking-tight">
                 {formatTime(time, city.timezone)}
               </div>
             </div>
          );
        })}
      </div>
    </div>
  );
}
