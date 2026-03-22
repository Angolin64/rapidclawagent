import Link from 'next/link';

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Volver al Inicio / Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
          🦞 Guía de Inicio: Tu Agente IA en 5 Minutos
        </h1>

        <p className="text-slate-400 mb-10 leading-relaxed text-lg">
          ¿Nunca has usado un VPS o una terminal? No te preocupes. Esta guía te lleva paso a paso — desde comprar el servidor hasta tener tu propio agente de IA corriendo 24/7.
        </p>

        {/* Paso 1: VPS */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Tu "Oficina" en la Nube (VPS)</h2>
          <p className="mb-4 leading-relaxed">
            Un <strong>VPS (Servidor Privado Virtual)</strong> es como alquilar una computadora pequeñita que vive en el internet y nunca se apaga. Ahí es donde vivirá tu agente.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl border-l-4 border-cyan-500">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Recomendación: Hostinger KVM 1</h3>
            <p className="mb-4">Es el plan más económico (~$6.49/mo) y es perfecto para OpenClaw.</p>
            <a 
              href="https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              👉 Obtener VPS en Hostinger (Link con Descuento)
            </a>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>• Selecciona <strong>Ubuntu 24.04</strong> como sistema operativo.</li>
              <li>• Ubicación: Estados Unidos (mejor latencia).</li>
            </ul>
          </div>
        </section>

        {/* Paso 2: API Keys */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">2. El "Cerebro" (API Key)</h2>
          <p className="mb-6">Necesitas una "llave" para que tu agente pueda pensar usando modelos como Gemini o Claude.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 border-t-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-2">Opción A: Google Gemini (GRATIS)</h3>
              <p className="text-sm mb-4">La mejor forma de empezar. No requiere tarjeta de crédito y es muy generosa.</p>
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-sm">
                Obtener API Key de Google →
              </a>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 border-t-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-2">Opción B: Anthropic (Claude)</h3>
              <p className="text-sm mb-4">El modelo más inteligente para tareas complejas. Requiere un depósito de $5.</p>
              <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-sm">
                Obtener API Key de Anthropic →
              </a>
            </div>
          </div>
        </section>

        {/* Paso 3: Instalación */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">3. La Magia: Instalación</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="mb-4">Entra a la <strong>Terminal</strong> de tu VPS en Hostinger y pega este comando:</p>
            <div className="bg-black rounded-lg p-4 font-mono text-cyan-400 border border-slate-800 overflow-x-auto text-sm mb-4">
              curl -sSL https://rapidclawagent.com/install.sh | bash
            </div>
            <p className="text-slate-400 text-sm">
              Presiona <strong>Enter</strong> y responde las preguntas (selecciona el Preset 1, pega tu API key y tu email).
            </p>
          </div>
        </section>

        {/* Paso 4: Telegram */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">4. Conecta tu Telegram</h2>
          <p className="mb-4">Para hablar con tu agente desde tu celular, necesitas crear un Bot:</p>
          <ol className="list-decimal list-inside space-y-3 ml-2 text-slate-300">
            <li>Busca a <strong>@BotFather</strong> en Telegram.</li>
            <li>Escribe <code className="text-cyan-400">/newbot</code> y sigue las instrucciones (nombre y usuario).</li>
            <li>Copia el <strong>HTTP API Token</strong> que te da.</li>
            <li>Pégalo cuando el instalador te lo pida (o agrégalo después).</li>
          </ol>
        </section>

        <section className="mb-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">¿Necesitas ayuda?</h2>
          <p className="text-slate-300 mb-6">Únete a nuestra comunidad en Discord para soporte en vivo y compartir tus automatizaciones.</p>
          <a 
            href="https://discord.com/invite/clawd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            💬 Unirse al Discord
          </a>
        </section>

        <footer className="border-t border-slate-800 pt-8 mt-12 text-center text-slate-500">
          <p className="text-xs italic">🦞 Built by Angel and Chat — RapidClawAgent Project.</p>
        </footer>
      </div>
    </main>
  );
}
