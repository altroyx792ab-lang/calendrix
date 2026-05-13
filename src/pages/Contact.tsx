import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Helmet>
        <title>Contact Us | Calendrix</title>
        <meta name="description" content="Get in touch with Calendrix. Reach out for support, inquiries, or feedback." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Get in <span className="text-brand-accent">Touch</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Have questions about our tools? Need help with productivity? I'm here to help you master your schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-accent/30 transition-colors group">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6 text-brand-accent group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Me</h3>
            <p className="text-gray-400 mb-4 text-sm font-medium">Direct support for all your inquiries.</p>
            <a href="mailto:altroyx792ab@gmail.com" className="text-brand-accent font-bold hover:underline break-all">
              altroyx792ab@gmail.com
            </a>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-accent/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp / Call</h3>
            <p className="text-gray-400 mb-4 text-sm font-medium">Fast communication for urgent matters.</p>
            <a href="tel:03262686887" className="text-blue-400 font-bold hover:underline">
              03262686887
            </a>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-accent/30 transition-colors group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-gray-400 mb-4 text-sm font-medium">Follow us for productivity tips.</p>
            <div className="flex gap-4">
              <span className="text-purple-400 font-bold cursor-pointer hover:underline">Instagram</span>
              <span className="text-purple-400 font-bold cursor-pointer hover:underline">LinkedIn</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <Send size={40} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">Message Sent!</h2>
                <p className="text-gray-400 mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Your Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent text-white transition-colors"
                        placeholder="Yahya Mughal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Your Email</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent text-white transition-colors"
                        placeholder="altroyx792ab@gmail.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent text-white transition-colors appearance-none"
                    >
                      <option className="bg-slate-900 leading-3">General Inquiry</option>
                      <option className="bg-slate-900">Feature Request</option>
                      <option className="bg-slate-900">Technical Issue</option>
                      <option className="bg-slate-900">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Message</label>
                    <textarea 
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent text-white resize-none transition-colors"
                      placeholder="Tell me how I can help you..."
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full py-5 bg-brand-accent text-slate-900 font-black text-lg rounded-2xl hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
                    ) : (
                      <>
                        <Send size={20} />
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
