'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { 
  LogOut, MessageSquare, Mail, BarChart3, Settings, 
  Trash2, Plus, Download, Sparkles, AlertTriangle, Calendar 
} from 'lucide-react';
import { 
  deleteContactMessage, addBuildingInPublic, deleteBuildingInPublic,
  addLinkedInPost, deleteLinkedInPost 
} from '@/app/actions';

const CATEGORIES = ['All', 'AI Engineering', 'LangChain', 'LangGraph', 'RAG', 'AI Agents', 'Machine Learning'];

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

interface Subscriber {
  id: string;
  email: string;
  createdAt: Date;
}

interface VisitorAnalytic {
  id: string;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  visitedAt: Date;
}

interface ProjectView {
  id: string;
  projectName: string;
  visitorIP: string;
  visitedAt: Date;
}

interface PublicUpdate {
  id: string;
  focus: string;
  streak: number;
  experiment: string;
  win: string;
  lesson: string;
  createdAt: Date;
}

interface LinkedInPost {
  id: string;
  title: string;
  category: string;
  thumbnail: string | null;
  postUrl: string;
  publishedAt: Date;
}

interface AdminDashboardClientProps {
  contacts: Contact[];
  subscribers: Subscriber[];
  analytics: VisitorAnalytic[];
  projectViews: ProjectView[];
  publicUpdates: PublicUpdate[];
  linkedinPosts: LinkedInPost[];
}

type TabType = 'messages' | 'subscribers' | 'analytics' | 'cms';

export default function AdminDashboardClient(props: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [localContacts, setLocalContacts] = useState(props.contacts);
  const [localUpdates, setLocalUpdates] = useState(props.publicUpdates);
  const [localLinkedin, setLocalLinkedin] = useState(props.linkedinPosts);

  // CMS state forms
  const [focus, setFocus] = useState('');
  const [streak, setStreak] = useState(props.publicUpdates[0]?.streak || 42);
  const [experiment, setExperiment] = useState('');
  const [win, setWin] = useState('');
  const [lesson, setLesson] = useState('');
  const [cmsMsg, setCmsMsg] = useState('');

  const [liTitle, setLiTitle] = useState('');
  const [liCategory, setLiCategory] = useState('AI Engineering');
  const [liUrl, setLiUrl] = useState('');
  const [liMsg, setLiMsg] = useState('');

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  // Actions handlers
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const res = await deleteContactMessage(id);
    if (res.success) {
      setLocalContacts(prev => prev.filter(m => m.id !== id));
    } else {
      alert(res.message);
    }
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCmsMsg('');
    if (!focus || !experiment || !win || !lesson) return;

    const res = await addBuildingInPublic({ focus, streak, experiment, win, lesson });
    if (res.success && res.data) {
      setLocalUpdates(prev => [res.data as any, ...prev]);
      setFocus('');
      setExperiment('');
      setWin('');
      setLesson('');
      setCmsMsg('Log update published successfully!');
    } else {
      setCmsMsg(res.message || 'Failed to add update.');
    }
  };

  const handleDeleteUpdate = async (id: string) => {
    if (!confirm('Delete this building log entry?')) return;
    const res = await deleteBuildingInPublic(id);
    if (res.success) {
      setLocalUpdates(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleAddLinkedIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLiMsg('');
    if (!liTitle || !liUrl) return;

    const res = await addLinkedInPost({ title: liTitle, category: liCategory, postUrl: liUrl });
    if (res.success && res.data) {
      setLocalLinkedin(prev => [res.data as any, ...prev]);
      setLiTitle('');
      setLiUrl('');
      setLiMsg('LinkedIn post registered successfully!');
    } else {
      setLiMsg(res.message || 'Failed to register post.');
    }
  };

  const handleDeleteLinkedIn = async (id: string) => {
    if (!confirm('Delete this LinkedIn reference?')) return;
    const res = await deleteLinkedInPost(id);
    if (res.success) {
      setLocalLinkedin(prev => prev.filter(p => p.id !== id));
    }
  };

  // CSV Exporters
  const downloadCSV = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportMessages = () => {
    const headers = 'ID,Name,Email,Subject,Message,Created At\n';
    const rows = localContacts.map(m => 
      `"${m.id}","${m.name.replace(/"/g, '""')}","${m.email}","${m.subject.replace(/"/g, '""')}","${m.message.replace(/"/g, '""')}","${m.createdAt}"`
    ).join('\n');
    downloadCSV('contact_messages.csv', headers + rows);
  };

  const exportSubscribers = () => {
    const headers = 'ID,Email,Subscribed At\n';
    const rows = props.subscribers.map(s => 
      `"${s.id}","${s.email}","${s.createdAt}"`
    ).join('\n');
    downloadCSV('newsletter_subscribers.csv', headers + rows);
  };

  const exportAnalytics = () => {
    const headers = 'ID,Device,Browser,Country,City,Visited At\n';
    const rows = props.analytics.map(a => 
      `"${a.id}","${a.device}","${a.browser}","${a.country}","${a.city}","${a.visitedAt}"`
    ).join('\n');
    downloadCSV('visitor_analytics.csv', headers + rows);
  };

  // Analytics helper calculations
  const totalViews = props.projectViews.length;
  const projectStats = props.projectViews.reduce((acc: Record<string, number>, curr) => {
    acc[curr.projectName] = (acc[curr.projectName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      {/* Header navbar */}
      <header className="px-6 py-4 bg-bg-tertiary border-b border-border-color flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent-teal/10 text-accent-teal">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-text-primary">Admin Control Dashboard</span>
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-bg-secondary hover:bg-red-500/10 border border-border-color hover:border-red-500/30 text-xs font-semibold rounded-xl text-text-secondary hover:text-red-500 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </header>

      {/* Main dashboard content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Navigation Sidebar controls (Col 3) */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm">
            <h3 className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider mb-4">Operations</h3>
            
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-accent-teal/10 text-accent-teal border-l-2 border-accent-teal'
                    : 'text-text-secondary hover:text-accent-teal hover:bg-bg-secondary/40'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Contact Messages
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-bg-secondary border border-border-color text-text-tertiary">
                  {localContacts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('subscribers')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'subscribers'
                    ? 'bg-accent-teal/10 text-accent-teal border-l-2 border-accent-teal'
                    : 'text-text-secondary hover:text-accent-teal hover:bg-bg-secondary/40'
                }`}
              >
                <Mail className="w-4 h-4" />
                Newsletter Subscribers
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-bg-secondary border border-border-color text-text-tertiary">
                  {props.subscribers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-accent-teal/10 text-accent-teal border-l-2 border-accent-teal'
                    : 'text-text-secondary hover:text-accent-teal hover:bg-bg-secondary/40'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Visitor Analytics
              </button>

              <button
                onClick={() => setActiveTab('cms')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'cms'
                    ? 'bg-accent-teal/10 text-accent-teal border-l-2 border-accent-teal'
                    : 'text-text-secondary hover:text-accent-teal hover:bg-bg-secondary/40'
                }`}
              >
                <Settings className="w-4 h-4" />
                CMS Content Manager
              </button>
            </div>
          </div>
          
          {/* CSV Exporters Block */}
          <div className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm">
            <h3 className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider mb-3.5">Export Options</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={exportMessages}
                className="w-full py-2 px-3 bg-bg-primary border border-border-color hover:border-accent-teal text-text-secondary hover:text-accent-teal rounded-xl text-[10px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export Messages to CSV
              </button>
              <button
                onClick={exportSubscribers}
                className="w-full py-2 px-3 bg-bg-primary border border-border-color hover:border-accent-teal text-text-secondary hover:text-accent-teal rounded-xl text-[10px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export Subscribers to CSV
              </button>
              <button
                onClick={exportAnalytics}
                className="w-full py-2 px-3 bg-bg-primary border border-border-color hover:border-accent-teal text-text-secondary hover:text-accent-teal rounded-xl text-[10px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export Analytics to CSV
              </button>
            </div>
          </div>
        </aside>

        {/* Dynamic content area (Col 9) */}
        <main className="flex-1 w-full flex flex-col gap-6">
          
          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm w-full">
              <h3 className="font-extrabold text-lg text-text-primary mb-5">Contact Submissions</h3>

              <div className="flex flex-col gap-4">
                {localContacts.map(m => (
                  <div key={m.id} className="p-5 rounded-2xl bg-bg-primary border border-border-color relative group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-sm text-text-primary">{m.name}</h4>
                          <span className="text-[10px] text-text-tertiary font-semibold">{m.email} &bull; {new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="p-1.5 rounded-lg border border-border-color hover:border-red-500 hover:text-red-500 text-text-tertiary transition-all cursor-pointer"
                          aria-label="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="bg-bg-secondary/40 border border-border-color/40 p-3.5 rounded-xl text-xs text-text-secondary mt-3.5 font-medium">
                        <strong className="block text-[10px] text-text-tertiary uppercase mb-1">Subject: {m.subject}</strong>
                        {m.message}
                      </div>
                    </div>
                  </div>
                ))}

                {localContacts.length === 0 && (
                  <div className="text-center py-12 text-xs text-text-tertiary font-medium">
                    No contact inquiries logged yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm w-full">
              <h3 className="font-extrabold text-lg text-text-primary mb-5">Newsletter Subscribers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border-color/80 text-text-tertiary uppercase tracking-wider font-bold">
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-border-color/40 hover:bg-bg-primary/20 text-text-secondary">
                        <td className="py-3 px-4 font-semibold text-text-primary">{sub.email}</td>
                        <td className="py-3 px-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {props.subscribers.length === 0 && (
                  <div className="text-center py-12 text-xs text-text-tertiary font-medium">
                    No email subscribers found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="flex flex-col gap-6 w-full">
              
              {/* Analytics Header Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm">
                  <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wide">Total Visited Sessions</span>
                  <span className="block text-2xl font-bold text-text-primary mt-1">{props.analytics.length} Hits</span>
                </div>
                <div className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm">
                  <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wide">Dynamic Project Views</span>
                  <span className="block text-2xl font-bold text-text-primary mt-1">{totalViews} Clicks</span>
                </div>
              </div>

              {/* Leaderboard project views */}
              <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm">
                <h3 className="font-extrabold text-sm uppercase text-text-tertiary tracking-wider mb-4">Project View Leaderboard</h3>
                <div className="flex flex-col gap-3">
                  {Object.entries(projectStats).map(([proj, count]) => (
                    <div key={proj} className="flex justify-between items-center text-xs font-semibold p-3 bg-bg-primary rounded-xl border border-border-color/60">
                      <span>{proj}</span>
                      <span className="px-2.5 py-1 bg-accent-teal/10 text-accent-teal rounded-lg">{count} Views</span>
                    </div>
                  ))}
                  {Object.keys(projectStats).length === 0 && (
                    <div className="text-center py-6 text-xs text-text-tertiary">No project views logged.</div>
                  )}
                </div>
              </div>

              {/* Browser/Device splits lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm">
                  <h3 className="font-bold text-sm text-text-primary mb-4">Device Spread</h3>
                  <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
                    {['Desktop', 'Mobile', 'Tablet'].map((dev) => {
                      const count = props.analytics.filter(a => a.device === dev).length;
                      const percentage = props.analytics.length > 0 ? Math.round((count / props.analytics.length) * 100) : 0;
                      return (
                        <div key={dev} className="flex justify-between items-center">
                          <span>{dev}</span>
                          <span className="font-bold text-text-primary">{count} ({percentage}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm">
                  <h3 className="font-bold text-sm text-text-primary mb-4">Browser Split</h3>
                  <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
                    {['Chrome', 'Firefox', 'Safari', 'Edge'].map((br) => {
                      const count = props.analytics.filter(a => a.browser === br).length;
                      const percentage = props.analytics.length > 0 ? Math.round((count / props.analytics.length) * 100) : 0;
                      return (
                        <div key={br} className="flex justify-between items-center">
                          <span>{br}</span>
                          <span className="font-bold text-text-primary">{count} ({percentage}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: CMS MANAGER */}
          {activeTab === 'cms' && (
            <div className="flex flex-col gap-8 w-full">
              
              {/* NOW LEARNING & DEV LOGS MANAGER */}
              <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm">
                <h3 className="font-extrabold text-base text-text-primary mb-4 flex items-center gap-1.5">
                  <Settings className="w-5 h-5 text-accent-teal" />
                  Publish Building Public Update
                </h3>

                {cmsMsg && (
                  <div className="p-3 bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-xs font-semibold rounded-xl mb-4">
                    {cmsMsg}
                  </div>
                )}

                <form onSubmit={handleAddUpdate} className="flex flex-col gap-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-text-secondary">Current Focus</label>
                      <input
                        type="text"
                        required
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        placeholder="e.g. LangGraph routing decisions & validation"
                        className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-text-secondary">Daily Streak Count</label>
                      <input
                        type="number"
                        required
                        value={streak}
                        onChange={(e) => setStreak(Number(e.target.value))}
                        className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-text-secondary">AI Experiment Description</label>
                    <input
                      type="text"
                      required
                      value={experiment}
                      onChange={(e) => setExperiment(e.target.value)}
                      placeholder="e.g. Built multi-agent routing loop utilizing OpenAI tools calling bindings"
                      className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-text-secondary">Weekly Win</label>
                      <input
                        type="text"
                        required
                        value={win}
                        onChange={(e) => setWin(e.target.value)}
                        placeholder="e.g. Preserved state context cleanly"
                        className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-text-secondary">Key Lesson Learned</label>
                      <input
                        type="text"
                        required
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                        placeholder="e.g. Avoid loop complexity overflow"
                        className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-4 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl font-bold cursor-pointer transition-all self-end flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Publish Update
                  </button>
                </form>

                {/* List of active logs to delete */}
                <h4 className="font-bold text-xs text-text-secondary mt-8 mb-4">Active Public Updates</h4>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto no-scrollbar">
                  {localUpdates.map((u) => (
                    <div key={u.id} className="flex justify-between items-center p-3 bg-bg-primary rounded-xl border border-border-color/60 text-xs">
                      <span className="font-mono text-text-secondary line-clamp-1 pr-6">Streak: {u.streak} &bull; {u.focus}</span>
                      <button
                        onClick={() => handleDeleteUpdate(u.id)}
                        className="p-1 text-text-tertiary hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* LINKEDIN POSTS MATRIX MANAGER */}
              <div className="p-6 rounded-3xl bg-bg-tertiary border border-border-color shadow-sm">
                <h3 className="font-extrabold text-base text-text-primary mb-4 flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-accent-teal fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Log LinkedIn Shared Post
                </h3>

                {liMsg && (
                  <div className="p-3 bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-xs font-semibold rounded-xl mb-4">
                    {liMsg}
                  </div>
                )}

                <form onSubmit={handleAddLinkedIn} className="flex flex-col gap-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-text-secondary">Post Title</label>
                      <input
                        type="text"
                        required
                        value={liTitle}
                        onChange={(e) => setLiTitle(e.target.value)}
                        placeholder="e.g. Custom multi-agent structures guide"
                        className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-text-secondary">Category</label>
                      <select
                        value={liCategory}
                        onChange={(e) => setLiCategory(e.target.value)}
                        className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary font-semibold"
                      >
                        {CATEGORIES.slice(1).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-text-secondary">LinkedIn Post URL</label>
                    <input
                      type="url"
                      required
                      value={liUrl}
                      onChange={(e) => setLiUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/posts/..."
                      className="px-3 py-2.5 rounded-xl bg-bg-primary border border-border-color outline-none focus:border-accent-teal text-text-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-4 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl font-bold cursor-pointer transition-all self-end flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Register Post
                  </button>
                </form>

                {/* List of active posts to delete */}
                <h4 className="font-bold text-xs text-text-secondary mt-8 mb-4">Registered LinkedIn posts</h4>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto no-scrollbar">
                  {localLinkedin.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-3 bg-bg-primary rounded-xl border border-border-color/60 text-xs">
                      <span className="font-semibold text-text-secondary line-clamp-1 pr-6">{p.title} ({p.category})</span>
                      <button
                        onClick={() => handleDeleteLinkedIn(p.id)}
                        className="p-1 text-text-tertiary hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}
