import { PRESETS } from '@/lib/presets';
import PresetCard from '@/components/PresetCard';
import Hero from '@/components/Hero';
import CostEstimator from '@/components/CostEstimator';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <Hero />

      {/* Presets Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pick Your Setup. Deploy in 60 Seconds.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Pre-built templates for real-world use cases. One command and your agent is live — no DevOps, no config hell.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRESETS.map((preset) => (
            <PresetCard key={preset.id} preset={preset} />
          ))}
        </div>
      </section>

      {/* Cost Estimator Section */}
      <section className="container mx-auto px-4 py-20">
        <CostEstimator />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Can Your Agent Do For You?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            This isn&apos;t another AI chatbot. It&apos;s your 24/7 digital employee — on your server, under your control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "💬",
              title: "Answer Messages Automatically",
              description: "Your agent replies to customers on Telegram, WhatsApp, and more — while you sleep."
            },
            {
              icon: "💰",
              title: "Save 60-80% on AI Costs",
              description: "Smart model routing cuts your API bill drastically vs paying for ChatGPT Plus or Claude Pro."
            },
            {
              icon: "📅",
              title: "Monitor Your Inbox & Calendar",
              description: "Get daily briefings, meeting alerts, and task summaries delivered straight to your phone."
            },
            {
              icon: "🔒",
              title: "Your Data, Your Server",
              description: "No third-party cloud snooping. Everything runs on your VPS. Your data stays yours."
            },
            {
              icon: "⚡",
              title: "Live in 60 Seconds",
              description: "One command. No Docker knowledge, no config files. Just paste and run."
            },
            {
              icon: "🚀",
              title: "Charge Clients for It",
              description: "Deploy agents for clients at $300-$500/mo. Your cost? ~$20/mo in API calls."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture / CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Own Your AI Agent?
          </h2>
          <p className="text-xl text-slate-300 mb-2">
            Enter your email and get the install guide. Your agent will be live in 60 seconds.
          </p>
          <p className="text-sm text-slate-500">
            🔥 First 100 users get priority support • Ubuntu 24.04 LTS • Tested on Hostinger, Hetzner, DigitalOcean
          </p>
        </div>
        <LeadCaptureForm />
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a 
            href="/guia" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-400/10 px-6 py-3 rounded-full text-base font-medium border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
          >
            📖 Beginner&apos;s Setup Guide
          </a>
          <a 
            href="https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:bg-slate-800 transition-colors bg-slate-900 px-6 py-3 rounded-full text-base font-medium border border-slate-700"
          >
            ☁️ Get VPS (Hostinger Link)
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-slate-800">
        <div className="text-center text-slate-500">
          <p>Built on <a href="https://openclaw.ai" className="text-cyan-400 hover:underline">OpenClaw</a> • Open Source • MIT License</p>
          <p className="mt-2">© 2026 RapidClawAgent</p>
        </div>
      </footer>
    </main>
  );
}
