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
            Deploy in 60 seconds • Save 60-80% on costs
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Launch Your
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI Agent
          </span>
          <br />
          In 60 Seconds
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto">
          Deploy OpenClaw on your VPS with zero config. 
          Cost-optimized templates. Battle-tested security. 
          Your own AI assistant, running 24/7.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#presets"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-4 rounded-lg transition-all text-lg shadow-lg shadow-cyan-500/50"
          >
            🚀 Get Started Free
          </a>
          <a
            href="https://github.com/yourusername/rapidclawagent"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-lg transition-all text-lg border border-slate-700"
          >
            ⭐ View on GitHub
          </a>
        </div>

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
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Open source</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </section>
  );
}
