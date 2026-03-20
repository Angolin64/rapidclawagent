import Link from 'next/link';

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
          🦞 Beginner&apos;s Getting Started Guide
        </h1>

        <p className="text-slate-400 mb-10 leading-relaxed text-lg">
          Never used a VPS or command line before? No problem. This guide walks you through 
          everything step by step — from buying a server to having your own AI agent running 24/7.
        </p>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">1. What Are We Building?</h2>
          <p className="mb-4 leading-relaxed">
            Think of it like renting a tiny computer that lives in the internet (that&apos;s called a <strong>VPS</strong>). 
            On that computer, we install a smart brain (<strong>OpenClaw</strong>) that works for you around the clock — 
            reading your emails, checking your calendar, and replying to your messages.
          </p>
          <p className="leading-relaxed">
            You set it up once. After that, it runs on its own, 24/7, without you having to do anything.
          </p>
        </section>

        {/* Step 2 */}
        <section className="mb-12 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            2. What You&apos;ll Need 🛒
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-lg font-bold text-cyan-400 mb-1">A VPS — Your Cloud Office</h3>
              <p className="mb-2">
                Get the cheapest <strong>VPS Hosting</strong> plan with <strong>Ubuntu 24.04</strong>. 
                We recommend Hostinger — affordable, reliable, and beginner-friendly.
              </p>
              <a 
                href="https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                👉 Get VPS on Hostinger (Discount Link)
              </a>
              <p className="text-xs text-slate-500 mt-2">
                *Using this link supports the project and gives you an exclusive discount.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-blue-400 mb-1">An AI Key (API Key)</h3>
              <p>
                This is the fuel that powers your agent. Go to{' '}
                <a href="https://console.anthropic.com/" className="underline text-cyan-400" target="_blank" rel="noopener noreferrer">Anthropic</a>{' '}
                or{' '}
                <a href="https://aistudio.google.com/" className="underline text-cyan-400" target="_blank" rel="noopener noreferrer">Google AI Studio</a>{' '}
                and grab your free API Key. It takes about 2 minutes.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-purple-400 mb-1">A Telegram Account (Recommended)</h3>
              <p>
                This is how you&apos;ll talk to your agent once it&apos;s live. 
                Download the Telegram app if you don&apos;t have it yet.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">3. Step-by-Step: The Setup</h2>
          <div className="space-y-8">

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">A</span>
                Log Into Your VPS
              </h3>
              <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-300">
                <li>Log in to your Hostinger account.</li>
                <li>Go to the <strong>VPS</strong> section and look for <strong>SSH Access</strong> or the browser Terminal.</li>
                <li>A black screen will open. Don&apos;t panic — that&apos;s where the magic happens.</li>
              </ol>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">B</span>
                Run the Magic Command
              </h3>
              <p className="mb-4 text-slate-300">Copy and paste this one command into the terminal, then hit Enter:</p>
              <div className="bg-black rounded-lg p-4 font-mono text-cyan-400 border border-slate-800 overflow-x-auto text-sm">
                curl -sSL https://rapidclawagent.com/install.sh | bash
              </div>
              <p className="mt-3 text-slate-400 text-sm">
                The installer will ask you a few simple questions (your API key, your Telegram bot token, etc.). 
                Just follow the prompts.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">C</span>
                Talk to Your Agent
              </h3>
              <p className="text-slate-300">
                Once the install finishes, open Telegram and message your bot. It will respond. 
                Your 24/7 AI agent is now live. 🎉
              </p>
            </div>

          </div>
        </section>

        {/* FAQ / Glossary */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">4. Quick Glossary</h2>
          <div className="space-y-4">
            {[
              { term: "VPS (Virtual Private Server)", def: "A virtual computer that runs 24/7 in the cloud. You rent it by the month — usually $4–$8/mo for the smallest plans." },
              { term: "SSH", def: "A way to connect to your VPS remotely through a terminal (the black screen). Think of it like a phone call to your server." },
              { term: "API Key", def: "A secret code that lets your agent use AI models like Claude or Gemini. It's like a password that pays per use." },
              { term: "OpenClaw", def: "The AI agent software that runs on your VPS and does the actual thinking and responding." },
              { term: "Telegram Bot", def: "A special Telegram account that your agent controls. You message it; your agent responds." },
            ].map(({ term, def }) => (
              <div key={term} className="border border-slate-800 rounded-lg p-4">
                <dt className="text-cyan-400 font-semibold mb-1">{term}</dt>
                <dd className="text-slate-400 text-sm">{def}</dd>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to start?</h2>
          <p className="text-slate-300 mb-6">Get your VPS, grab an API key, and run the command above. You&apos;ll be live in under 60 seconds.</p>
          <a 
            href="https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 text-lg"
          >
            ☁️ Get Your VPS on Hostinger
          </a>
        </section>

        <footer className="border-t border-slate-800 pt-8 mt-12 text-center text-slate-500">
          <p>Need help? Join our community.</p>
          <p className="mt-2 text-xs italic">🦞 Built by Angel and Chat for humans.</p>
        </footer>
      </div>
    </main>
  );
}
