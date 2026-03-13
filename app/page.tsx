import { PRESETS } from '@/lib/presets';
import PresetCard from '@/components/PresetCard';
import Hero from '@/components/Hero';
import CostEstimator from '@/components/CostEstimator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <Hero />

      {/* Presets Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Agent Template
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Pick a preset optimized for your use case. Deploy in 60 seconds.
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
            Why RapidClawAgent?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "60-Second Deploy",
              description: "One command. No config files. Your agent is live instantly."
            },
            {
              icon: "💰",
              title: "Cost Optimized",
              description: "Save 60-80% on API costs with intelligent model routing."
            },
            {
              icon: "🔒",
              title: "Secure by Default",
              description: "Hardened VPS, firewall rules, and SSH security out of the box."
            },
            {
              icon: "🔄",
              title: "Always On",
              description: "24/7 uptime. Your agent never sleeps or forgets context."
            },
            {
              icon: "🎯",
              title: "Battle-Tested Templates",
              description: "Presets based on real-world deployments and best practices."
            },
            {
              icon: "🚀",
              title: "Zero DevOps",
              description: "No Docker, no Node.js version hell. Just copy-paste and go."
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Launch Your Agent?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Copy-paste one command. 60 seconds later, you have your own AI agent.
          </p>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-6 font-mono text-left overflow-x-auto">
            <code className="text-cyan-400">
              curl -sSL https://rapidclawagent.com/install.sh | bash
            </code>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-sm text-slate-400">
              Works on Ubuntu 24.04 LTS • Tested on Hostinger, Hetzner, DigitalOcean
            </p>
            <a 
              href="/guia.md" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-400/10 px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/20"
            >
              📖 ¿Primera vez? Lee la Guía para Principiantes
            </a>
          </div>
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
