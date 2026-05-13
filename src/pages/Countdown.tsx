import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, CalendarDays, X } from 'lucide-react';
import { CALENDRIX_EVENTS } from '../data/events-data';

interface SavedCountdown {
  id: string;
  name: string;
  targetDate: string;
  category: string;
  color: string;
  createdAt: number;
}

export default function Countdown() {
  const { user } = useAuth();
  const [countdowns, setCountdowns] = useState<SavedCountdown[]>([]);
  const [now, setNow] = useState(new Date().getTime());
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newColor, setNewColor] = useState('#C9A84C');

  useEffect(() => {
    const fetchCountdowns = async () => {
      if (!user) {
        // Fallback to local storage if not logged in
        const saved = localStorage.getItem('calendrix_countdowns');
        if (saved) setCountdowns(JSON.parse(saved));
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('countdowns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setCountdowns(data.map(item => ({
          id: item.id,
          name: item.name,
          targetDate: item.target_date,
          category: item.category,
          color: item.color,
          createdAt: new Date(item.created_at).getTime()
        })));
      }
      setLoading(false);
    };

    fetchCountdowns();
    
    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  const addCountdown = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDate) return;

    const targetDateIso = new Date(newDate).toISOString();
    
    if (user) {
      const { data, error } = await supabase
        .from('countdowns')
        .insert({
          user_id: user.id,
          name: newName,
          target_date: targetDateIso,
          color: newColor,
          category: 'Personal'
        })
        .select()
        .single();

      if (data) {
        setCountdowns([{
          id: data.id,
          name: data.name,
          targetDate: data.target_date,
          category: data.category,
          color: data.color,
          createdAt: new Date(data.created_at).getTime()
        }, ...countdowns]);
      }
    } else {
      // Local fallback
      const newItem: SavedCountdown = {
        id: Date.now().toString(),
        name: newName,
        targetDate: targetDateIso,
        category: 'Personal',
        color: newColor,
        createdAt: Date.now()
      };
      const updated = [newItem, ...countdowns];
      setCountdowns(updated);
      localStorage.setItem('calendrix_countdowns', JSON.stringify(updated));
    }

    setShowModal(false);
    setNewName('');
    setNewDate('');
  };

  const removeCountdown = async (id: string) => {
    if (user) {
      await supabase.from('countdowns').delete().eq('id', id);
    }
    const updated = countdowns.filter(c => c.id !== id);
    setCountdowns(updated);
    if (!user) {
      localStorage.setItem('calendrix_countdowns', JSON.stringify(updated));
    }
  };

  const calculateTimeLeft = (targetDate: string) => {
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Countdowns | Calendrix</title>
      </Helmet>

      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Countdowns</h1>
          <p className="text-gray-400">Anticipate your most important moments.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-accent)] text-black rounded-xl font-bold hover:bg-white transition-colors"
        >
          <Plus size={18} /> New Countdown
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {countdowns.map(timer => {
            const timeLeft = calculateTimeLeft(timer.targetDate);
            const totalDuration = new Date(timer.targetDate).getTime() - timer.createdAt;
            const elapsed = now - timer.createdAt;
            const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

            return (
              <motion.div
                key={timer.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-2xl p-6 relative overflow-hidden"
              >
                {/* Top color bar */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: timer.color }} />
                
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold">{timer.name}</h3>
                  <button onClick={() => removeCountdown(timer.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>

                {timeLeft ? (
                  <div className="grid grid-cols-4 gap-2 text-center mb-6">
                    <div className="bg-white/5 rounded-lg py-2">
                      <div className="text-2xl font-mono font-bold">{timeLeft.days}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">Days</div>
                    </div>
                    <div className="bg-white/5 rounded-lg py-2">
                      <div className="text-2xl font-mono font-bold">{timeLeft.hours}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">Hrs</div>
                    </div>
                    <div className="bg-white/5 rounded-lg py-2">
                      <div className="text-2xl font-mono font-bold">{timeLeft.minutes}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">Min</div>
                    </div>
                    <div className="bg-white/5 rounded-lg py-2">
                      <div className="text-2xl font-mono font-bold">{timeLeft.seconds}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">Sec</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                      🎉 It's Here!
                    </p>
                  </div>
                )}

                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%`, backgroundColor: timer.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {countdowns.length === 0 && (
          <div className="col-span-full text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
            <CalendarDays className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No countdowns set. Add your first important date!</p>
          </div>
        )}
      </div>

      {/* Modal for New Countdown */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-brand-bg)] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">New Countdown</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={addCountdown} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Name</label>
                <input 
                  required
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[var(--color-brand-accent)]"
                  placeholder="e.g. My Graduation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Target Date & Time</label>
                <input 
                  required
                  type="datetime-local" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[var(--color-brand-accent)] text-white color-scheme-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Theme Color</label>
                <div className="flex gap-2">
                  {['#C9A84C', '#2D6A4F', '#4A2C6B', '#FF9933', '#1A5276', '#E11D48'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${newColor === c ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full py-3 bg-[var(--color-brand-accent)] text-black font-bold rounded-xl hover:bg-white hover:text-black transition-colors">
                  Create Timer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
