import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Clock, Calendar as CalendarIcon, ArrowRight, MessageSquare, RefreshCw } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isToday,
  setYear,
  setMonth,
  getYear,
  getMonth,
  eachDayOfInterval
} from 'date-fns';
import { cn } from '../lib/utils';
import { getEventsForDate, CalendrixEvent } from '../data/events-data';

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTHS_UR = [
  'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
  'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'
];

const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_UR = ['پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ', 'اتوار'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showHijri, setShowHijri] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  
  const [inputYear, setInputYear] = useState(getYear(currentDate).toString());
  const [inputMonth, setInputMonth] = useState(getMonth(currentDate).toString());

  const t = {
    en: {
      title: "Global Calendar",
      subtitle: "Accurate Islamic & Gregorian dates",
      showCalendar: "Show Calendar",
      yearLabel: "Year",
      monthLabel: "Month",
      today: "Today",
      islamicDates: "Islamic Dates",
      hideIslamic: "Hide Islamic Dates",
      showIslamic: "Show Islamic Dates",
      emptyState: "No major religious or global events on this date.",
      setCountdown: "Set Countdown",
      go: "Go",
      assistantPrompt: "Select year and month to view the calendar:"
    },
    ur: {
      title: "عالمی کیلنڈر",
      subtitle: "درست اسلامی اور گریگورین تاریخیں",
      showCalendar: "کیلنڈر دکھائیں",
      yearLabel: "سال",
      monthLabel: "مہینہ",
      today: "آج",
      islamicDates: "اسلامی تاریخیں",
      hideIslamic: "اسلامی تاریخیں چھپائیں",
      showIslamic: "اسلامی تاریخیں دکھائیں",
      emptyState: "اس تاریخ کو کوئی بڑا مذہبی یا عالمی واقعہ نہیں ہے۔",
      setCountdown: "کاؤنٹ ڈاؤن سیٹ کریں",
      go: "چلیں",
      assistantPrompt: "کیلنڈر دیکھنے کے لیے سال اور مہینہ منتخب کریں:"
    }
  }[language];

  const nextMonth = () => {
    const next = addMonths(currentDate, 1);
    setCurrentDate(next);
    setInputYear(getYear(next).toString());
    setInputMonth(getMonth(next).toString());
  };

  const prevMonth = () => {
    const prev = subMonths(currentDate, 1);
    setCurrentDate(prev);
    setInputYear(getYear(prev).toString());
    setInputMonth(getMonth(prev).toString());
  };

  const handleGo = () => {
    let year = parseInt(inputYear);
    if (isNaN(year)) year = getYear(new Date());
    // Clamp year between 1 and 9999
    year = Math.max(1, Math.min(9999, year));
    
    let month = parseInt(inputMonth);
    
    let newDate = new Date();
    newDate = setYear(newDate, year);
    newDate = setMonth(newDate, month);
    newDate = startOfMonth(newDate);
    
    setCurrentDate(newDate);
    setInputYear(year.toString());
  };

  const getHijriDate = (date: Date) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
      });
      return formatter.format(date);
    } catch (e) {
      return '';
    }
  };

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    // Correctly get Monday start to Sunday end
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({
      start: startDate,
      end: endDate
    });
  }, [currentDate]);

  const renderSelector = () => {
    return (
      <div className={cn(
        "bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 backdrop-blur-md",
        language === 'ur' && "text-right flex-row-reverse"
      )}>
        <div className={`flex flex-wrap items-end gap-4 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">
              {t.monthLabel}
            </label>
            <select 
              value={inputMonth}
              onChange={(e) => setInputMonth(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {(language === 'en' ? MONTHS_EN : MONTHS_UR).map((m, i) => (
                <option key={i} value={i} className="bg-slate-900">{m}</option>
              ))}
            </select>
          </div>
          <div className="basis-32">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">
              {t.yearLabel}
            </label>
            <input 
              type="number"
              value={inputYear}
              onChange={(e) => setInputYear(e.target.value)}
              min="1"
              max="9999"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button 
            onClick={handleGo}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            {t.go}
          </button>
          
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="ml-auto px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors uppercase font-sans"
          >
            {language === 'en' ? 'اردو' : 'English'}
          </button>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className={`flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-white ${language === 'ur' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className={`flex items-center gap-4 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
            <button 
              onClick={() => {
                const now = new Date();
                setCurrentDate(now);
                setInputYear(getYear(now).toString());
                setInputMonth(getMonth(now).toString());
              }} 
              className="px-4 py-1 text-sm font-medium hover:bg-white/10 rounded-full transition-colors"
            >
              {t.today}
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            {language === 'en' 
              ? format(currentDate, 'MMMM yyyy') 
              : `${MONTHS_UR[getMonth(currentDate)]} ${getYear(currentDate)}`}
          </h2>
          {showHijri && (
            <span className="hidden sm:inline text-xl text-emerald-400 font-display opacity-80 mt-1">
              — {getHijriDate(currentDate)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowHijri(!showHijri)}
            className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            {showHijri ? t.hideIslamic : t.showIslamic}
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = language === 'en' ? DAYS_EN : DAYS_UR;
    return (
      <div className={`grid grid-cols-7 mb-2 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
        {days.map((d, i) => (
          <div key={i} className="text-center font-bold text-xs text-gray-500 py-3 uppercase tracking-widest">
            {d}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);

    const dayElements = calendarDays.map((day) => {
      const dbDateStr = format(day, 'yyyy-MM-dd');
      const isCurrentMonth = isSameMonth(day, monthStart);
      const dayEvents = getEventsForDate(dbDateStr);
      const isTodayDay = isToday(day);

      return (
        <div
          key={day.toISOString()}
          onClick={() => setSelectedDate(day)}
          className={cn(
            "min-h-[100px] sm:min-h-[140px] p-2 border border-white/5 relative group cursor-pointer transition-all duration-300",
            !isCurrentMonth ? "bg-black/20 text-gray-700" : "bg-white/[0.03] hover:bg-white/[0.08] text-white",
            isTodayDay && "ring-2 ring-emerald-500 ring-inset bg-emerald-500/5",
            isSameDay(day, selectedDate || new Date(0)) && "bg-emerald-500/10 border-emerald-500/30"
          )}
        >
          <div className={`flex justify-between items-start ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className={cn(
              "text-lg font-bold font-display", 
              isTodayDay && "text-emerald-400",
              !isCurrentMonth && "opacity-30"
            )}>
              {format(day, 'd')}
            </span>
          </div>
          
          {showHijri && isCurrentMonth && (
            <div className={`text-[10px] text-emerald-500/70 mt-1 font-medium select-none uppercase ${language === 'ur' ? 'text-right' : 'text-left'}`}>
              {getHijriDate(day).split(' ')[0]}
            </div>
          )}

          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
            {dayEvents.map(evt => (
              <div 
                key={evt.id} 
                className="w-1.5 h-1.5 rounded-full shadow-sm" 
                style={{ backgroundColor: evt.color }}
              />
            ))}
          </div>
          
          {dayEvents.length > 0 && (
            <div className="hidden group-hover:block absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-slate-900 text-xs p-3 rounded-xl shadow-2xl border border-white/10 pointer-events-none backdrop-blur-md">
              {dayEvents.map(evt => (
                <div key={evt.id} className={`flex items-center gap-2 my-1 ${language === 'ur' ? 'flex-row-reverse text-right' : 'flex-row'}`}>
                  <span className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ backgroundColor: evt.color }}/>
                  <span className="truncate">{evt.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm grid grid-cols-7">
        {dayElements}
      </div>
    );
  };


  const selectedEvents = selectedDate ? getEventsForDate(format(selectedDate, 'yyyy-MM-dd')) : [];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${language === 'ur' ? 'text-right' : 'text-left'}`}>
      <Helmet>
        <title>{t.title} | Calendrix</title>
        <meta name="description" content="View global religious events, Gregorian, and Hijri dates on our inclusive calendar layout." />
      </Helmet>

      <div className={`mb-12 ${language === 'ur' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-gray-400">{t.subtitle}</p>
      </div>

      {renderSelector()}
      
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <div className={`mt-12 flex flex-wrap justify-center gap-8 text-sm ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"/> Islamic</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"/> Christian</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"/> Hindu</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-500 shadow-lg shadow-slate-500/50"/> Global</div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0f1e] border border-white/10 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden"
            >
              <div className={`flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02] ${language === 'ur' ? 'flex-row-reverse text-right' : 'flex-row'}`}>
                <div>
                  <h3 className="text-xl font-bold font-display">
                    {language === 'en' 
                      ? format(selectedDate, 'EEEE, MMMM d, yyyy') 
                      : `${DAYS_UR[(selectedDate.getDay() + 6) % 7]}, ${MONTHS_UR[getMonth(selectedDate)]} ${format(selectedDate, 'd')}, ${getYear(selectedDate)}`}
                  </h3>
                  {showHijri && (
                    <p className="text-emerald-400 text-sm mt-1 font-medium">{getHijriDate(selectedDate)}</p>
                  )}
                </div>
                <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {selectedEvents.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock size={32} className="opacity-20" />
                    </div>
                    <p>{t.emptyState}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedEvents.map((evt) => (
                      <div key={evt.id} className={`p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors ${language === 'ur' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-4 mb-3 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="text-3xl bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl">{evt.emoji}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg" style={{ color: evt.color }}>{evt.name}</h4>
                            {evt.arabicName && <span className="text-gray-500 text-sm font-sans">{evt.arabicName}</span>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {evt.description}
                        </p>
                        <div className={`mt-6 flex gap-3 ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                            <Clock size={14} /> {t.setCountdown}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
