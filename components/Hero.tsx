export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-20 pb-32 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-sm font-medium text-cyan-300">
            Free to deploy • Saves 60-80% vs hosted AI tools
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Own AI Assistant.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Working 24/7.
          </span>
          <br />
          One Command.
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-400 mb-6 max-w-3xl mx-auto">
          Stop paying $100/month for AI tools you don't control.
          Deploy your own agent on your VPS in 60 seconds —
          your data, your server, your rules.
        </p>

        {/* ROI hook */}
        <p className="text-base md:text-lg text-cyan-300/80 mb-12 max-w-2xl mx-auto italic">
          "Charge clients $500/mo for automation that costs you $20/mo in API calls."
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#presets"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-4 rounded-lg transition-all text-lg shadow-lg shadow-cyan-500/50"
          >
            🚀 Deploy My Agent — Free
          </a>
          <a
            href="https://github.com/Angolin64/rapidclawagent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-lg transition-all text-lg border border-slate-700"
          >
            ⭐ View on GitHub
          </a>
        </div>

        {/* Urgency nudge */}
        <p className="mt-6 text-sm text-slate-500">
          🔥 Join the first 100 users and get priority support — no waitlist, no credit card.
        </p>

        {/* Social Proof */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Open source</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Your data stays yours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
