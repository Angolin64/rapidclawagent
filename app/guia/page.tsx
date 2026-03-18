import Link from 'next/link';

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Volver al Inicio
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
          🦞 Guía de Inicio para Principiantes
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">1. El Concepto: ¿Qué estamos haciendo?</h2>
          <p className="mb-4 leading-relaxed">
            Imagina que compras una computadora pequeña que vive en internet (eso es un <strong>VPS</strong>). 
            En esa computadora, vamos a instalar un cerebro inteligente (<strong>OpenClaw</strong>) que trabajará para ti todo el día, 
            leyendo tus correos, revisando tu calendario y respondiendo tus mensajes.
          </p>
        </section>

        <section className="mb-12 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            2. Los Ingredientes 🛒
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-lg font-bold text-cyan-400 mb-1">Un VPS (Tu oficina en la nube)</h3>
              <p>Compra el plan más barato de "VPS Hosting" con <strong>Ubuntu 24.04</strong>.</p>
              <a 
                href="https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                👉 Compra en Hostinger con Descuento
              </a>
              <p className="text-xs text-slate-500 mt-2">
                *Al usar este link apoyas el proyecto y recibes un descuento exclusivo.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-blue-400 mb-1">Una "Llave" de IA (API Key)</h3>
              <p>Es como el combustible. Ve a <a href="https://console.anthropic.com/" className="underline">Anthropic</a> o <a href="https://aistudio.google.com/" className="underline">Google AI Studio</a> y obtén tu API Key.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Paso a Paso: La Instalación</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Paso A: Entrar a tu VPS</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Entra a tu panel de Hostinger.</li>
                <li>Ve a la sección de <strong>VPS</strong> y busca el acceso <strong>SSH</strong> o Terminal.</li>
                <li>Se abrirá una pantalla negra. No te asustes, ahí es donde sucede la magia.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-medium text-white mb-2">Paso B: El Comando Mágico</h3>
              <p className="mb-4">Copia y pega este comando en la terminal:</p>
              <div className="bg-black rounded-lg p-4 font-mono text-cyan-400 border border-slate-800 overflow-x-auto">
                curl -sSL https://rapidclawagent.com/install.sh | bash
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-8 mt-12 text-center text-slate-500">
          <p>¿Necesitas ayuda? Únete a nuestra comunidad.</p>
          <p className="mt-2 text-xs italic">🦞 Creado por Angel y Chat para humanos.</p>
        </footer>
      </div>
    </main>
  );
}
