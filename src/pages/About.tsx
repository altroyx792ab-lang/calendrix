import { Helmet } from 'react-helmet-async';
import { Mail, Shield, Globe, Clock, GraduationCap, Code, Rocket, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <Helmet>
        <title>About Us | Calendrix</title>
        <meta name="description" content="Meet Yahya Mughal, the creator behind Calendrix - a productivity and calendar management blog." />
      </Helmet>

      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
          <Rocket size={16} />
          <span className="text-sm font-bold uppercase tracking-wider">The Visionary Behind Calendrix</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 text-white leading-tight">
          Hi, I'm <span className="text-emerald-400 italic">Yahya Mughal</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          A 18-year-old passionate developer and digital marketer dedicated to helping people master their time through smart tools and insights.
        </p>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center p-12">
            <div className="text-center">
              <Code size={80} className="text-emerald-500 mx-auto mb-6" />
              <div className="space-y-2">
                <p className="text-2xl font-bold font-display text-white">Professional Vibe Coder</p>
                <p className="text-emerald-400 font-medium">Digital Marketer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold font-display mb-6 text-white">My Journey</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Having completed my <strong>I.Com</strong> education, I quickly realized that the digital landscape is where my true passion lies. Currently, I am expanding my horizons by pursuing a <strong>Digital Marketing course</strong>, blending technical web development skills with strategic marketing insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <GraduationCap className="text-emerald-500 mb-3" />
              <h4 className="font-bold text-white mb-1">Education</h4>
              <p className="text-sm text-gray-400 text-sm">Completed I.Com</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <Code className="text-emerald-500 mb-3" />
              <h4 className="font-bold text-white mb-1">Expertise</h4>
              <p className="text-sm text-gray-400 text-sm">Professional Vibe Coder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Website Purpose */}
      <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border border-white/10 rounded-[3rem] p-8 md:p-16 mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <Globe className="w-12 h-12 text-emerald-500 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-white tracking-tight">What is Calendrix?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Calendrix is more than just a tool; it's a productivity and calendar management hub. I created this space to share tips, tools, and professional insights about time management, scheduling, and digital productivity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold uppercase tracking-widest">Time Management</span>
            <span className="px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold uppercase tracking-widest">Digital Productivity</span>
            <span className="px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold uppercase tracking-widest">Smart Scheduling</span>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <Shield size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Trust</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Providing reliable data and proven productivity techniques for our users.</p>
        </div>
        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
            <Award size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Quality</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Every tool and article is crafted with a professional vibe and extreme attention to detail.</p>
        </div>
        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-500">
            <Clock size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Efficiency</h3>
          <p className="text-gray-400 text-sm leading-relaxed">We help you save time so you can spend it on what truly matters in your life.</p>
        </div>
      </div>
    </div>
  );
}
