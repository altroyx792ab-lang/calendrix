import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CalendarDays, Globe2, MoonStar, Clock, Hourglass, Calculator } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'Global Calendar',
      icon: <CalendarDays className="w-8 h-8 text-[var(--color-brand-accent)]" />,
      desc: 'Gregorian intertwined seamlessly with Hijri dates. One view for your daily life.',
      link: '/calendar',
    },
    {
      title: 'Religious Events',
      icon: <Globe2 className="w-8 h-8 text-[var(--color-brand-islamic)]" />,
      desc: 'Inclusive tracking of Islamic, Christian, and Hindu significant days.',
      link: '/events',
    },
    {
      title: 'Real-time Moon',
      icon: <MoonStar className="w-8 h-8 text-[var(--color-brand-silver)]" />,
      desc: 'Live tracking of lunar phases. Essential for Hijri month observations.',
      link: '/moon-phases',
    },
    {
      title: 'World Clock',
      icon: <Clock className="w-8 h-8 text-[var(--color-brand-hindu)]" />,
      desc: '195+ Cities across multiple time zones, instantly synced.',
      link: '/world-clock',
    },
    {
      title: 'Countdown Timer',
      icon: <Hourglass className="w-8 h-8 text-[var(--color-brand-christian)]" />,
      desc: 'Never miss an event. Set custom countdowns for important days.',
      link: '/countdown',
    },
    {
      title: 'Age Calculator',
      icon: <Calculator className="w-8 h-8 text-blue-400" />,
      desc: 'Calculate precise time lived to the very second and heartbeat.',
      link: '/age-calculator',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)]">
      <Helmet>
        <title>Calendrix | The World's Most Inclusive Calendar</title>
        <meta name="description" content="Calendrix is a next-generation, culturally inclusive calendar combining Gregorian, Hijri, and multiple global events with beautiful aesthetics." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col justify-center items-center text-center px-4 py-20 lg:py-32">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-brand-accent)]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--color-brand-islamic)]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)] animate-pulse"></span>
            3 World Religions Covered
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            The World's Most <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-accent)] via-white to-[var(--color-brand-silver)]">Inclusive Calendar</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Design meets culture. Track Islamic, Christian, and Hindu events, live moon phases, and real-time world clocks on a single, beautifully crafted platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/calendar" className="px-8 py-4 bg-[var(--color-brand-accent)] text-black font-semibold rounded-xl hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              Explore Calendar
            </Link>
            <Link to="/events" className="px-8 py-4 bg-white/5 text-white border border-white/10 font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
              View Events
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link to={feature.link} className="block group h-full">
                <div className="glass-card p-6 rounded-2xl h-full border border-white/5 hover:border-[var(--color-brand-accent)]/50 transition-colors duration-300">
                  <div className="mb-4 p-3 bg-white/5 inline-block rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Numbers / Stats preview */}
      <section className="border-t border-white/10 bg-black/50 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 text-center">
          <div>
            <h4 className="text-3xl font-display font-bold text-white mb-2">3</h4>
            <p className="text-sm text-gray-400">World Religions Covered</p>
          </div>
          <div>
            <h4 className="text-3xl font-display font-bold text-white mb-2">195+</h4>
            <p className="text-sm text-gray-400">Cities World Clock</p>
          </div>
          <div>
            <h4 className="text-3xl font-display font-bold text-white mb-2">12+</h4>
            <p className="text-sm text-gray-400">Islamic Months Sync</p>
          </div>
          <div>
            <h4 className="text-3xl font-display font-bold text-white mb-2">Live</h4>
            <p className="text-sm text-gray-400">Real-time Moon Phases</p>
          </div>
        </div>
      </section>
    </div>
  );
}
