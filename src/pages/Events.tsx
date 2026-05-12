import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, ArrowRight, MessageSquare, X, RefreshCw } from 'lucide-react';
import { CALENDRIX_EVENTS, Religion, getDaysUntil } from '../data/events-data';
import { Link } from 'react-router-dom';

interface AssistantEvent {
  name: string;
  urName: string;
  month: string;
  urMonth: string;
  description: string;
  urDescription: string;
}

const COMMUNITY_EVENTS: Record<string, AssistantEvent[]> = {
  muslim: [
    { name: "Ramadan", urName: "رمضان", month: "March-April", urMonth: "مارچ-اپریل", description: "Month of fasting and prayer", urDescription: "روزے اور عبادت کا مہینہ" },
    { name: "Eid ul Fitr", urName: "عید الفطر", month: "After Ramadan", urMonth: "رمضان کے بعد", description: "Celebration of end of fasting", urDescription: "روزہ ختم ہونے کا جشن" },
    { name: "Eid ul Adha", urName: "عید الاضحی", month: "June-July", urMonth: "جون-جولائی", description: "Festival of sacrifice", urDescription: "قربانی کا تہوار" },
    { name: "Shab e Barat", urName: "شب برات", month: "February-March", urMonth: "فروری-مارچ", description: "Night of forgiveness", urDescription: "مغفرت کی رات" },
    { name: "Eid Milad un Nabi", urName: "عید میلاد النبی", month: "September", urMonth: "ستمبر", description: "Prophet Muhammad's birthday", urDescription: "حضور صلی اللہ علیہ وسلم کی سالگرہ" },
    { name: "Muharram/Ashura", urName: "محرم/عاشورہ", month: "July-August", urMonth: "جولائی-اگست", description: "Islamic New Year month", urDescription: "اسلامی نئے سال کا مہینہ" },
    { name: "Shab e Qadr", urName: "شب قدر", month: "Last 10 days of Ramadan", urMonth: "رمضان کے آخری 10 دن", description: "Night of Power", urDescription: "طاقت کی رات" },
    { name: "Jumatul Wida", urName: "جمعۃ الوداع", month: "Last Friday of Ramadan", urMonth: "رمضان کا آخری جمعہ", description: "Special Friday prayer", urDescription: "خصوصی جمعہ کی نماز" },
  ],
  hindu: [
    { name: "Holi", urName: "ہولی", month: "March", urMonth: "مارچ", description: "Festival of colors and spring", urDescription: "رنگوں اور بہار کا تہوار" },
    { name: "Ram Navami", urName: "رام نومی", month: "April", urMonth: "اپریل", description: "Lord Ram's birthday", urDescription: "بھگوان رام کی سالگرہ" },
    { name: "Janmashtami", urName: "جنم اشٹمی", month: "August", urMonth: "اگست", description: "Lord Krishna's birthday", urDescription: "بھگوان کرشنا کی سالگرہ" },
    { name: "Navratri", urName: "نوراتری", month: "October", urMonth: "اکتوبر", description: "Nine nights of Goddess worship", urDescription: "دیوی کی عبادت کی نو راتیں" },
    { name: "Dussehra", urName: "دسہرہ", month: "October", urMonth: "اکتوبر", description: "Victory of good over evil", urDescription: "برائی پر اچھائی کی جیت" },
    { name: "Diwali", urName: "دیوالی", month: "October-November", urMonth: "اکتوبر-نومبر", description: "Festival of lights", urDescription: "روشنیوں کا تہوار" },
    { name: "Ganesh Chaturthi", urName: "گنیش چترتھی", month: "August-September", urMonth: "اگست-ستمبر", description: "Lord Ganesha's festival", urDescription: "بھگوان گنیش کا تہوار" },
    { name: "Makar Sankranti", urName: "مکر سنکرانتی", month: "January", urMonth: "جنوری", description: "Harvest festival", urDescription: "فصل کی کٹائی کا تہوار" },
  ],
  christian: [
    { name: "Ash Wednesday", urName: "ایش وینس ڈے", month: "February-March", urMonth: "فروری-مارچ", description: "Beginning of Lent", urDescription: "لینٹ کا آغاز" },
    { name: "Good Friday", urName: "گڈ فرائیڈے", month: "March-April", urMonth: "مارچ-اپریل", description: "Crucifixion of Jesus", urDescription: "حضرت عیسیٰ کی مصلوبیت" },
    { name: "Easter Sunday", urName: "ایسٹر سنڈے", month: "March-April", urMonth: "مارچ-اپریل", description: "Resurrection of Jesus", urDescription: "حضرت عیسیٰ کا جی اٹھنا" },
    { name: "Pentecost", urName: "پینٹیکوسٹ", month: "May-June", urMonth: "مئی-جون", description: "Descent of Holy Spirit", urDescription: "روح القدس کا نزول" },
    { name: "Christmas Eve", urName: "کرسمس ایو", month: "December 24", urMonth: "24 دسمبر", description: "Night before Christmas", urDescription: "کرسمس سے پہلے کی رات" },
    { name: "Christmas", urName: "کرسمس", month: "December 25", urMonth: "25 دسمبر", description: "Birth of Jesus Christ", urDescription: "حضرت عیسیٰ علیہ السلام کی پیدائش" },
    { name: "All Saints Day", urName: "آل سینٹس ڈے", month: "November 1", urMonth: "1 نومبر", description: "Honor all saints", urDescription: "تمام اولیاء کا احترام" },
    { name: "Epiphany", urName: "ایپی فینی", month: "January 6", urMonth: "6 جنوری", description: "Visit of the Wise Men", urDescription: "دانشمندوں کی آمد" },
  ],
};

function EventAssistant() {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  const t = {
    en: {
      ask: "Please select your community to see relevant events:",
      muslim: "Muslim",
      hindu: "Hindu",
      christian: "Christian",
      reset: "Start Over",
      desc: "Event Assistant",
      events: "Events",
    },
    ur: {
      ask: "براہ کرم متعلقہ واقعات دیکھنے کے لیے اپنی کمیونٹی کا انتخاب کریں:",
      muslim: "مسلمان",
      hindu: "ہندو",
      christian: "عیسائی",
      reset: "دوبارہ شروع کریں",
      desc: "ایونٹ اسسٹنٹ",
      events: "واقعات",
    }
  };

  const currentT = t[language];

  return (
    <div className={`bg-gradient-to-br from-indigo-900/40 to-emerald-900/40 border border-white/10 rounded-3xl p-6 md:p-8 mb-16 shadow-2xl backdrop-blur-md relative overflow-hidden ${language === 'ur' ? 'text-right' : 'text-left'}`}>
      <div className={`absolute top-0 p-4 flex gap-2 ${language === 'ur' ? 'left-0' : 'right-0'}`}>
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="text-xs font-bold px-2 py-1 bg-white/10 hover:bg-white/20 rounded border border-white/10 transition-colors uppercase font-sans"
        >
          {language === 'en' ? 'اردو' : 'English'}
        </button>
      </div>

      <div className={`flex items-center gap-3 mb-6 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <MessageSquare size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-display">{currentT.desc}</h2>
          <p className="text-sm text-gray-400">{language === 'en' ? 'Discover events tailored for you' : 'اپنے لیے موزوں واقعات دریافت کریں'}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedCommunity ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-lg mb-6 text-gray-200">{currentT.ask}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedCommunity('muslim')}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all group hover:border-emerald-500/50"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">🕌</span>
                <span className="font-bold">{currentT.muslim}</span>
              </button>
              <button
                onClick={() => setSelectedCommunity('hindu')}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all group hover:border-orange-500/50"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">🛕</span>
                <span className="font-bold">{currentT.hindu}</span>
              </button>
              <button
                onClick={() => setSelectedCommunity('christian')}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all group hover:border-purple-500/50"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">✝️</span>
                <span className="font-bold">{currentT.christian}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`flex justify-between items-center mb-4 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
              <h3 className="text-lg font-bold capitalize text-emerald-400">
                {language === 'en' ? `${selectedCommunity} ${currentT.events}` : `${currentT[selectedCommunity as keyof typeof currentT]} ${currentT.events}`}
              </h3>
              <button 
                onClick={() => setSelectedCommunity(null)}
                className={`text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <RefreshCw size={12} />
                {currentT.reset}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMMUNITY_EVENTS[selectedCommunity].map((evt, i) => (
                <div key={i} className={`p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors ${language === 'ur' ? 'text-right' : 'text-left'}`}>
                  <div className={`flex justify-between items-start mb-1 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <h4 className="font-bold text-white">{language === 'en' ? evt.name : evt.urName}</h4>
                    <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-medium whitespace-nowrap">
                      {language === 'en' ? evt.month : evt.urMonth}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {language === 'en' ? evt.description : evt.urDescription}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Events() {
  const [filter, setFilter] = useState<Religion | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredEvents = CALENDRIX_EVENTS.filter(evt => {
    const matchesFilter = filter === 'all' || evt.religion === filter;
    const matchesSearch = evt.name.toLowerCase().includes(search.toLowerCase()) || 
                          evt.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Religious & Global Events | Calendrix</title>
        <meta name="description" content="Explore significant Islamic, Christian, Hindu, and Global events with precise dates and cultural context." />
      </Helmet>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Sacred Times & Traditions</h1>
        <p className="text-lg text-gray-400">Discover and celebrate the most important days across the world's major religions and global occurrences.</p>
      </div>

      <EventAssistant />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          {(['all', 'islamic', 'christian', 'hindu', 'global'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === tab 
                  ? 'bg-white/20 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-[var(--color-brand-accent)] focus:ring-1 focus:ring-[var(--color-brand-accent)] transition-all"
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEvents.map((evt, idx) => {
            const daysAway = getDaysUntil(evt.date);
            return (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full pointer-events-none" 
                  style={{ backgroundColor: evt.color }}
                />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span 
                    className="text-xs font-semibold px-2 py-1 rounded-md text-black"
                    style={{ backgroundColor: evt.color }}
                  >
                    {evt.badge}
                  </span>
                  <span className="text-2xl">{evt.emoji}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{evt.name}</h3>
                
                <div className="text-sm font-medium text-gray-300 mb-4 flex divide-x divide-white/20">
                  <span className="pr-3">{new Date(evt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  {evt.hijriDate && <span className="pl-3 text-[var(--color-brand-islamic)]">{evt.hijriDate}</span>}
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {evt.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  {daysAway >= 0 ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-brand-accent)] bg-[var(--color-brand-accent)]/10 px-2 py-1 rounded">
                      <Clock size={12} />
                      {daysAway === 0 ? 'Today!' : `${daysAway} days away`}
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-gray-500">Passed</div>
                  )}
                  
                  <Link 
                    to={`/blog/${slugify(evt.name)}`}
                    className="text-sm font-medium hover:text-[var(--color-brand-accent)] flex items-center gap-1 transition-colors"
                  >
                    Read More 
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
