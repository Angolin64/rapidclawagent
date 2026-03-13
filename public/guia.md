# 🦞 Guía de Inicio para Principiantes (RapidClawAgent)

¡Hola! Si llegaste aquí es porque quieres tener tu propio **Agente de Inteligencia Artificial** 24/7 pero no tienes idea de qué es un VPS, una Terminal o cómo funciona OpenClaw. No te preocupes, esta guía es para humanos, no para robots.

---

## 1. El Concepto: ¿Qué estamos haciendo?
Imagina que compras una computadora pequeña que vive en internet (eso es un **VPS**). En esa computadora, vamos a instalar un cerebro inteligente (**OpenClaw**) que trabajará para ti todo el día, leyendo tus correos, revisando tu calendario y respondiendo tus mensajes.

---

## 2. Los Ingredientes (Lo que necesitas)
Antes de empezar, necesitas tener estas 3 cosas:

1.  **Un VPS (Tu oficina en la nube):** Nosotros recomendamos **Hostinger**. Compra el plan más barato de "VPS Hosting" con **Ubuntu 24.04**.
2.  **Una "Llave" de Inteligencia Artificial (API Key):** Es como el combustible. 
    *   Ve a [Anthropic Console](https://console.anthropic.com/) o [Google AI Studio](https://aistudio.google.com/).
    *   Crea una cuenta y obtén tu **API Key**. Guárdala bien.
3.  **Telegram (Opcional):** Si quieres hablar con tu agente por el celular, crea un bot hablando con [@BotFather](https://t.me/botfather) en Telegram. Te dará un "Token".

---

## 3. Paso a Paso: La Instalación

### Paso A: Entrar a tu VPS
1.  Entra a tu panel de **Hostinger**.
2.  Ve a la sección de **VPS** y busca un botón que diga **"Terminal"** o **"Acceso SSH"**.
3.  Se abrirá una pantalla negra. ¡No te asustes! Es ahí donde le daremos las órdenes.

### Paso B: El Comando Mágico
Copia este texto (completo) y pégalo en esa pantalla negra, luego presiona la tecla **Enter**:

```bash
curl -sSL https://rapidclawagent.com/install.sh | bash
```

### Paso C: Responder al Asistente
La pantalla te hará unas preguntas. Solo tienes que escribir y dar Enter:
1.  **Selecciona el tipo de agente:** Escribe `1` y dale a Enter (es el mejor para empezar).
2.  **Pega tu llave (API Key):** Cuando te pida la "Anthropic Key" o "Google Key", pega el código que guardaste en el paso 2.
3.  **Telegram:** Si tienes el token del bot de Telegram, pégalo. Si no, solo dale a Enter para saltar.

---

## 4. ¿Cómo hablo con mi agente?
Una vez que veas un mensaje verde que dice **SUCCESS**, ¡tu agente ya está vivo!

*   **En la pantalla negra:** Escribe `openclaw chat` y salúdalo.
*   **En Telegram:** Si configuraste el bot, búscalo en tu celular y escríbele un mensaje.

---

## 5. Glosario Rápido para no perderse
*   **VPS:** Una computadora alquilada que nunca se apaga.
*   **Terminal:** La pantalla negra donde escribes comandos.
*   **API Key:** El código que le da permiso a tu agente para usar cerebros como Claude o Gemini.
*   **OpenClaw:** El sistema operativo de tu agente.
*   **RapidClawAgent:** El instalador rápido que acabas de usar.

---

### 🆘 ¿Algo salió mal?
Si te sale un error, simplemente borra todo y empieza de nuevo con este comando:
`rm -rf ~/.openclaw && curl -sSL https://rapidclawagent.com/install.sh | bash`

---
*🦞 Creado con amor por Angel y Chat para que todos puedan tener su propia IA.*
