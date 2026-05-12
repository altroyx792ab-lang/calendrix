import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Lock } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function AuthPage() {
  const { user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (user) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
        <Helmet>
          <title>Profile | Calendrix</title>
        </Helmet>
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md text-center">
          <div className="w-16 h-16 bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-400 mb-8">You are logged in as {user.email}</p>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full py-3 bg-red-500/10 text-red-500 font-semibold rounded-xl hover:bg-red-500/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
      <Helmet>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'} | Calendrix</title>
      </Helmet>
      
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {isSignUp ? 'Sign up to sync your calendar' : 'Sign in to access your data'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white"
                placeholder="hello@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-2 bg-[var(--color-brand-accent)] text-black font-bold rounded-xl hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
