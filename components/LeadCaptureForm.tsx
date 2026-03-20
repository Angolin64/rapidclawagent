'use client';

import { useState } from 'react';

export default function LeadCaptureForm() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: '', email: '', language: 'en' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Something went wrong');
      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">🦞</div>
        <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in!</h3>
        <p className="text-slate-300 mb-6">
          Check your email for the install guide. Run this command on your VPS:
        </p>
        <div className="bg-black rounded-lg p-4 font-mono text-cyan-400 border border-slate-800 text-sm mb-4 text-left overflow-x-auto">
          curl -sSL https://rapidclawagent.com/install.sh | bash
        </div>
        <a
          href="/guia"
          className="text-cyan-400 hover:text-cyan-300 underline text-sm"
        >
          📖 Need help? Read the step-by-step guide
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-lg mx-auto shadow-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-2 text-center">
        Get Your Agent Running in 60 Seconds
      </h3>
      <p className="text-slate-400 text-sm text-center mb-6">
        Enter your info and we&apos;ll send you the install guide.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          required
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <select
          value={form.language}
          onChange={e => setForm({ ...form, language: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </div>

      {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 text-lg"
      >
        {loading ? 'Sending...' : 'Get My Install Command →'}
      </button>

      <p className="text-xs text-slate-500 text-center mt-3">
        No spam. Just your install guide and occasional tips.
      </p>
    </form>
  );
}
