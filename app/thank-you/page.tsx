import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">🦞</div>
        <h1 className="text-4xl font-bold text-white mb-4">You&apos;re all set!</h1>
        <p className="text-xl text-slate-300 mb-8">
          Check your inbox — we just sent you the install guide.
        </p>

        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-lg font-bold text-white mb-4">📋 Quick Start</h2>
          <p className="text-slate-400 mb-4">Run this command on your VPS:</p>
          <div className="bg-black rounded-lg p-4 font-mono text-cyan-400 border border-slate-800 overflow-x-auto text-sm">
            curl -sSL https://rapidclawagent.com/install.sh | bash
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/guia"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            📖 Read the Setup Guide
          </Link>
          <Link
            href="/help"
            className="border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            🆘 Need Help?
          </Link>
        </div>

        <p className="text-slate-500 text-sm mt-8">
          Didn&apos;t get the email? Check spam or{' '}
          <Link href="/" className="text-cyan-400 hover:underline">
            go back and try again
          </Link>.
        </p>
      </div>
    </main>
  );
}
