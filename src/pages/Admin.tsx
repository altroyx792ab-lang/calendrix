import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, LogOut, Users, Activity, Settings, Database } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCountdowns: 0,
    systemHealth: 'Excelent',
    lastSync: new Date().toLocaleTimeString()
  });
  const [usersList, setUsersList] = useState<any[]>([]);
  const [fetchingStats, setFetchingStats] = useState(false);

  // Fetch real data from Supabase
  const fetchDashboardData = async () => {
    setFetchingStats(true);
    try {
      // 1. Fetch Users from profiles table
      const { data: profiles, count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // 2. Fetch Countdowns (if table exists)
      const { count: countdownCount, error: countError } = await supabase
        .from('countdowns')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: userCount || 0,
        activeCountdowns: countdownCount || 0,
        systemHealth: 'Stable',
        lastSync: new Date().toLocaleTimeString()
      });

      if (profiles) {
        setUsersList(profiles);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setFetchingStats(false);
    }
  };

  React.useEffect(() => {
    if (user && isAdmin) {
      fetchDashboardData();
    }
  }, [user, isAdmin]);

  // If Supabase is initializing
  if (loading) {
    return <div className="p-20 text-center text-gray-400">Loading...</div>;
  }

  // If user is logged in but not admin
  if (user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Login view if not logged in
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Helmet>
          <title>Admin Login | Calendrix</title>
        </Helmet>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <ShieldCheck className="w-12 h-12 text-[var(--color-brand-accent)] mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-display">System Administration</h1>
            <p className="text-sm text-gray-400 mt-2">Restricted Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Admin Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[var(--color-brand-accent)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[var(--color-brand-accent)]"
              />
            </div>
            <button 
              type="submit" 
              disabled={authLoading}
              className="w-full py-3 bg-[var(--color-brand-accent)] text-black font-bold rounded-xl mt-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
            >
              {authLoading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard view for Admin
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Admin Dashboard | Calendrix</title>
      </Helmet>

      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <ShieldCheck className="text-[var(--color-brand-islamic)]" /> Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Logged in as {user.email}</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors font-medium border border-red-500/20"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'Registered Users', val: stats.totalUsers.toLocaleString(), icon: <Users size={24} />, color: 'text-blue-400' },
          { title: 'Countdowns Created', val: stats.activeCountdowns.toLocaleString(), icon: <Activity size={24} />, color: 'text-green-400' },
          { title: 'System Status', val: stats.systemHealth, icon: <ShieldCheck size={24} />, color: 'text-emerald-400' },
          { title: 'Last Data Sync', val: stats.lastSync, icon: <Settings size={24} />, color: 'text-purple-400' },
        ].map((stat, i) => (
           <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col hover:border-white/20 transition-all">
             <div className="flex justify-between items-start mb-4">
               <span className="text-sm font-medium text-gray-400">{stat.title}</span>
               <span className={stat.color}>{stat.icon}</span>
             </div>
             <span className="text-3xl font-bold font-mono">{stat.val}</span>
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <Users size={18} className="text-blue-400" /> Registered Users
            </h3>
            <button 
              onClick={fetchDashboardData}
              disabled={fetchingStats}
              className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
            >
              {fetchingStats ? 'Refreshing...' : 'Refresh List'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">User ID</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {usersList.length > 0 ? usersList.map((u, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-[10px] text-gray-500">{u.id}</td>
                    <td className="px-6 py-4 text-sm">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500 italic">
                      No users found in the profiles table.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center text-center bg-white/[0.02]">
          <Database className="w-12 h-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Backend Hub</h3>
          <p className="text-gray-400 text-sm mb-6">
            Connected to Supabase Project. You are monitoring real-time user registrations and system metrics.
          </p>
          <div className="w-full space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">API Status</span>
              <span className="text-green-500">Online</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Database</span>
              <span className="text-green-500">Connected</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Auth Service</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
