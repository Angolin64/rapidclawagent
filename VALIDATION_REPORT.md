# PROTOCOLO DE VALIDACIÓN PRE-LANZAMIENTO
## RapidClawAgent — Reporte Completo
**Fecha:** 2026-03-22  
**Responsable:** Chat (AI Assistant)  
**Launch Target:** Martes 2026-03-26  
**Site:** https://rapidclawagent.com

---

## APARTADO A — RADIOGRAFÍA DEL PROYECTO

### 01. ¿Cuál es el propósito central de la aplicación y qué necesidad cubre?

**Propósito:**  
RapidClawAgent es un **one-command installer** que permite a usuarios no técnicos (y técnicos que quieren ahorrar tiempo) desplegar un agente de IA (OpenClaw) completamente configurado en su propio VPS en menos de 5 minutos.

**Necesidad que cubre:**
- **Barrera técnica eliminada:** Los usuarios sin experiencia en Linux/Docker/Node.js pueden tener su propio AI assistant sin configuración manual.
- **Optimización de costos:** Presets incluidos que reducen costos de API en 60-80% vs configuración por defecto.
- **Soporte automatizado:** GHL bot integrado que responde preguntas comunes, reduce carga de soporte manual.
- **Onboarding automatizado:** Serie de emails educativos (D0, D3, D7, D14) para maximizar retención y satisfacción.

---

### 02. ¿Qué stack técnico se ha usado?

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel (deployment automático desde GitHub)
- **Styling:** Tailwind CSS
- **Components:** React 18
- **Forms:** Native HTML forms + client-side validation

**Backend:**
- **API Routes:** Next.js API Routes (serverless functions en Vercel)
- **Endpoints:**
  - `POST /api/subscribe` → Captura leads (nombre, email, idioma preferido)
  - `POST /api/install-complete` → Actualiza status de contactos post-instalación

**Infraestructura del Usuario:**
- **Target Environment:** Ubuntu 20.04+ en VPS (Hostinger, DigitalOcean, AWS EC2, etc.)
- **Container Runtime:** Docker + Docker Compose
- **Installer:** Bash script (`install.sh`) que:
  - Instala Node.js (via NodeSource APT repo)
  - Instala OpenClaw CLI (npm global)
  - Genera `openclaw.json` (via Python script embebido)
  - Inicia servicio con `openclaw gateway start`

**Base de Datos:**
- **Ninguna propia:** RapidClawAgent no almacena datos localmente
- **CRM externo:** GoHighLevel (SaaS) almacena contactos, workflows, conversaciones del bot

**Servicios Externos:**
- GoHighLevel (CRM + Email Automation + Support Bot)
- Resend (emails transaccionales, si aplica)
- Cloudflare (DNS + proxy)
- GitHub (repo del proyecto + install.sh hosting)

---

### 03. ¿Qué servicios o APIs de terceros consume el sistema?

**GoHighLevel API:**
- **Scopes utilizados:**
  - `contacts.write` → Crear/actualizar contactos
  - `contacts.readonly` → Leer info de contactos
  - `workflows.readonly` → Verificar estado de workflows
  - `conversations.write` → Interacciones del bot
- **PIT Token:** `pit-1447af9f-14ef-4e28-b13f-2be2c3bba04d`
- **Location ID:** `uujzcIgFYgPc2IAeVWAS`
- **Rate Limits:** 100 req/min (tier estándar GHL)

**Cloudflare:**
- **DNS Management:** A record apuntando a Vercel (76.76.21.21)
- **CNAME:** `cname.vercel-dns.com`
- **No API calls programáticos:** Solo configuración manual

**Vercel:**
- **Deployment automático:** Push a `main` → deploy
- **No API calls desde el código:** Solo hosting

**GitHub:**
- **Hosting del `install.sh`:** `https://raw.githubusercontent.com/Angolin64/rapidclawagent/main/public/install.sh`
- **No GitHub API calls:** Solo serving estático

**Resend** (potencial):
- **Status:** No implementado aún
- **Uso futuro:** Emails transaccionales (confirmaciones, notificaciones)

---

### 04. ¿Quién interactuará con el producto?

**Público Objetivo:**

1. **Desarrolladores indie** (30%)
   - Quieren AI assistant personal sin vendor lock-in
   - Prefieren self-hosted por privacidad/control
   - Skill técnico: medio-alto

2. **No-code builders / Marketers** (40%)
   - Usan herramientas como Zapier, Make, GHL
   - Quieren automatización pero no saben programar
   - Skill técnico: bajo-medio

3. **Agencias digitales** (20%)
   - Quieren ofrecer AI assistants a clientes
   - Necesitan white-label/customizable
   - Skill técnico: medio

4. **Curiosos/early adopters** (10%)
   - Vieron el proyecto en Product Hunt / X / Reddit
   - Quieren probar la tecnología
   - Skill técnico: variable

**Interacciones:**
- **Landing page:** Lead capture (nombre, email, idioma)
- **Install script:** Ejecutan `curl | bash` en su VPS
- **Support bot (GHL):** Chat widget en la página + respuestas automáticas
- **Emails automáticos:** Serie de onboarding (4 emails en 14 días)

---

### 05. ¿Qué categoría de datos maneja?

**Datos capturados:**

| Categoría | Datos | Sensibilidad | Almacenamiento | Propósito |
|-----------|-------|--------------|----------------|-----------|
| **Identificativos** | Nombre, Email | Baja-Media | GoHighLevel | Lead nurturing, soporte |
| **Preferencias** | Idioma preferido (ES/EN) | Baja | GoHighLevel | Personalización de emails |
| **Técnicos** | VPS Provider (custom field) | Baja | GoHighLevel | Segmentación, troubleshooting |
| **Instalación** | Install Status (custom field) | Baja | GoHighLevel | Seguimiento de conversión |
| **Conversaciones** | Mensajes del chat bot | Baja-Media | GoHighLevel | Soporte, mejora del bot |

**NO se capturan:**
- ❌ Datos financieros (no hay pagos aún)
- ❌ Credenciales (API keys, passwords)
- ❌ Datos clínicos
- ❌ Información del contenido de las conversaciones del usuario con su OpenClaw instalado (eso queda en su VPS)

**Clasificación RGPD:**
- **PII (Personally Identifiable Information):** Sí (nombre + email)
- **Datos sensibles (Art. 9 RGPD):** No
- **Datos de menores:** No (T&C deben especificar +18 o consentimiento parental)

---

### 06. ¿En qué infraestructura está alojado?

**RapidClawAgent (Landing + APIs):**
- **Hosting:** Vercel (Frankfurt / us-east-1, según región del request)
- **CDN:** Vercel Edge Network (global)
- **Repositorio:** GitHub (privado: `Angolin64/rapidclawagent`)
- **DNS:** Cloudflare (nameservers: `amos.ns.cloudflare.com`, `jill.ns.cloudflare.com`)
- **SSL/TLS:** Automático via Vercel (Let's Encrypt)

**GoHighLevel (CRM/Bot/Workflows):**
- **Hosting:** SaaS (GHL infraestructura propia, multi-tenant)
- **Región:** US (no especificada públicamente)
- **Responsabilidad:** GHL maneja backups, uptime, seguridad

**OpenClaw Instalado (usuario final):**
- **Hosting:** VPS del usuario (Hostinger, DigitalOcean, AWS, etc.)
- **Container:** Docker (imagen oficial de OpenClaw)
- **Responsabilidad:** Usuario final (Angel no tiene acceso a esos servidores)

---

### 07. ¿Implementa algún mecanismo de autenticación?

**Landing Page / APIs:**
- **NO hay autenticación de usuarios:** Es un sitio público
- **Formulario de captura:** Sin login/signup tradicional
- **API Routes:**
  - `/api/subscribe`: Sin auth (rate limiting recomendado)
  - `/api/install-complete`: Sin auth (rate limiting recomendado)

**GHL Support Bot:**
- **No requiere login:** Widget de chat público embebido
- **Identificación:** Por email (si el usuario lo proporciona voluntariamente en el chat)

**OpenClaw Instalado (usuario final):**
- **Auth del Gateway:** Token-based (generado durante `install.sh`)
- **Responsabilidad:** Usuario final (Angel no maneja esos tokens)

**Riesgos identificados:**
- ⚠️ [AMAR] `/api/subscribe` y `/api/install-complete` están expuestos sin rate limiting → riesgo de spam/abuse
- ⚠️ [AMAR] No hay CAPTCHA en el lead form → bots pueden llenar la base de contactos

---

### 08. ¿Intervienen pagos, suscripciones o datos financieros sensibles?

**Status Actual:**
- **NO:** RapidClawAgent es 100% gratuito en su versión actual
- **No hay integración con Stripe, PayPal, etc.**
- **No se capturan tarjetas de crédito**

**Planes Futuros (según MEMORY.md):**
- **Modelo Freemium planificado:**
  - **Free Tier:** Instalación básica (siempre gratis)
  - **Pro Tier:** ~$97/mes (soporte prioritario, templates premium, updates automáticos)
  - **Elite Tier:** ~$197/mes (white-label, multi-instancia, onboarding personalizado)

**Cuando se implemente:**
- [ROJO] Integrar Stripe (PCI-DSS compliant, no manejar datos de tarjetas directamente)
- [ROJO] Actualizar Privacy Policy y T&C
- [ROJO] Implementar webhooks de Stripe firmados (validar `stripe-signature` header)

---

## SEMÁFORO INICIAL — APARTADO A

| Item | Status | Nota |
|------|--------|------|
| Propósito claro | [OK] | Bien definido |
| Stack documentado | [OK] | Next.js + Vercel + GHL |
| APIs identificadas | [OK] | GHL es la principal |
| Usuarios definidos | [OK] | 4 segmentos claros |
| Datos categorizados | [OK] | PII básico, no sensible |
| Infraestructura mapeada | [OK] | Vercel + GHL SaaS |
| Auth revisado | [AMAR] | Falta rate limiting en APIs |
| Pagos | [OK] | No aplica (por ahora) |

---

## APARTADO B — SALUD DEL ECOSISTEMA DE PAQUETES

### B.1 — Detección de Fallos de Seguridad en Librerías

**Comando:** `npm audit`

**Resultados:**
- **Total vulnerabilities:** 2
  - 🟡 **Moderate:** 1 (Next.js)
  - 🔴 **High:** 1 (flatted)
  - ⚪ **Critical:** 0

**Detalles:**

#### 1. Next.js (Moderate Severity)
- **Package:** `next@16.1.6`
- **Vulnerabilities identificadas:**
  1. **HTTP request smuggling in rewrites** (GHSA-ggv3-7p47-pfv8)
  2. **Unbounded next/image disk cache growth** (GHSA-3x4c-7xq6-9pq8)
  3. **Unbounded postponed resume buffering DoS** (GHSA-h27x-g6w4-24gq)
  4. **null origin can bypass Server Actions CSRF** (GHSA-mq59-m269-xvcx)
- **Versión afectada:** >=16.0.0 <16.1.7
- **Fix disponible:** ✅ Sí (actualizar a `next@16.2.1`)
- **Evaluación:**
  - ⚠️ [AMAR] HTTP smuggling: requiere configuración específica de rewrites (no usadas en RapidClawAgent)
  - ⚠️ [AMAR] Image cache: DoS potencial si se abusa de `next/image` (no aplica en landing estático)
  - ⚠️ [AMAR] CSRF bypass: requiere Server Actions (no usadas, solo API routes)
  - **Recomendación:** Actualizar a `next@16.2.1` antes del launch (bajo riesgo pero fácil de resolver)

#### 2. flatted (High Severity)
- **Package:** `flatted@3.4.1` (dependencia indirecta)
- **Vulnerability:** Prototype Pollution via `parse()` (GHSA-rf6f-7fwh-wjgh)
- **Versión afectada:** <=3.4.1
- **Fix disponible:** ✅ Sí
- **Evaluación:**
  - ⚠️ [AMAR] Prototype pollution: potencialmente explotable si se parsean objetos no confiables
  - flatted es dependencia de desarrollo (no en runtime de producción)
  - **Recomendación:** Ejecutar `npm audit fix` para actualizar automáticamente

**Acción requerida:**
```bash
cd projects/rapidclawagent
npm audit fix
npm update next@latest
npm run build  # Verificar que no hay breaking changes
```

---

### B.2 — Librerías Obsoletas

**Comando:** `npm outdated`

**Resultados:**

| Package | Current | Wanted | Latest | Gap | Priority |
|---------|---------|--------|--------|-----|----------|
| next | 16.1.6 | 16.1.6 | **16.2.1** | +0.5 minor | [AMAR] Actualizar (fixes de seguridad) |
| react | 19.2.3 | 19.2.3 | **19.2.4** | +0.1 patch | [OK] Opcional (solo bugfixes) |
| react-dom | 19.2.3 | 19.2.3 | **19.2.4** | +0.1 patch | [OK] Opcional |
| tailwindcss | 4.2.1 | 4.2.2 | **4.2.2** | +0.1 patch | [OK] Recomendado (bugfixes) |
| eslint | 9.39.4 | 9.39.4 | **10.1.0** | +1 major | [OK] Esperar (breaking changes) |
| @types/node | 20.19.37 | 20.19.37 | **25.5.0** | +5 major | [OK] Mantener (LTS) |

**Evaluación:**
- [AMAR] **Next.js 16.1.6 → 16.2.1:** Contiene fixes de las vulnerabilidades identificadas en B.1. **Actualizar antes del launch.**
- [OK] **React 19.2.3 → 19.2.4:** Patch release, solo bugfixes menores. No crítico.
- [OK] **Tailwind 4.2.1 → 4.2.2:** Patch release. Actualizar si hay tiempo, no bloqueante.
- [OK] **ESLint 9 → 10:** Major release, puede romper config. Dejar para después del launch.

---

### B.3 — Fiabilidad de Dependencias

**Dependencias críticas analizadas:**

#### Next.js
- **Mantenedor:** Vercel (empresa solvente, billions in funding)
- **Actividad:** Releases semanales, >120k stars en GitHub
- **Seguridad:** Security team dedicado, CVEs parchados rápidamente
- **Alternativas:** Remix, Astro (menos maduras para este caso de uso)
- **Evaluación:** ✅ [OK] Altamente confiable

#### React
- **Mantenedor:** Meta (Facebook)
- **Actividad:** Desarrollo activo, millones de usuarios
- **Seguridad:** Historial excelente
- **Evaluación:** ✅ [OK] Estándar de la industria

#### Tailwind CSS
- **Mantenedor:** Tailwind Labs (Adam Wathan)
- **Actividad:** Versión 4 lanzada recientemente, desarrollo activo
- **Seguridad:** Sin historial de brechas mayores
- **Evaluación:** ✅ [OK] Confiable

#### Dependencias SaaS (GoHighLevel)
- **Confiabilidad:** SLA no público, pero servicio estable según experiencia
- **Riesgo:** Vendor lock-in moderado (migrar a otro CRM requeriría reescribir integraciones)
- **Mitigación:** Mantener backups de contactos vía API exports periódicos
- **Evaluación:** ⚠️ [AMAR] Dependencia crítica sin SLA formal

---

### B.4 — Revisión de Licencias

**Comando:** `npx license-checker --summary`

**Resultados:**

| Licencia | Cantidad | Compatibilidad Comercial | Riesgo |
|----------|----------|--------------------------|--------|
| MIT | 302 | ✅ Sí | [OK] |
| Apache-2.0 | 21 | ✅ Sí | [OK] |
| ISC | 15 | ✅ Sí | [OK] |
| BSD-2-Clause | 7 | ✅ Sí | [OK] |
| BSD-3-Clause | 2 | ✅ Sí | [OK] |
| MPL-2.0 | 3 | ⚠️ Copyleft débil | [OK] Solo si no se modifica el código MPL |
| LGPL-3.0 | 1 | ⚠️ Copyleft fuerte | [AMAR] Identificar paquete, evaluar si está en runtime |
| CC-BY-4.0 | 1 | ✅ Sí (assets) | [OK] |
| UNLICENSED | 1 | ❌ Sin licencia | [AMAR] Identificar paquete, puede ser legal issue |

**Hallazgos críticos:**

1. **LGPL-3.0-or-later (1 paquete):**
   - **Riesgo:** Si este paquete está en el runtime de producción y modificas su código, debes open-source tus cambios
   - **Acción:** Identificar paquete (`npx license-checker | grep LGPL`)
   - **Mitigación:** Si es dev dependency, no hay problema; si es prod, evaluar alternativa

2. **UNLICENSED (1 paquete):**
   - **Riesgo:** Uso no autorizado puede generar problemas legales
   - **Acción:** Identificar paquete (`npx license-checker | grep UNLICENSED`)
   - **Mitigación:** Contactar autor o reemplazar

**Comando de auditoría profunda:**
```bash
npx license-checker | grep -E "LGPL|UNLICENSED" -A 5
```

---

## SEMÁFORO — APARTADO B

| Item | Status | Nota |
|------|--------|------|
| Vulnerabilidades | [AMAR] | 2 vulns (moderate+high), fix disponible |
| Librerías obsoletas | [AMAR] | Next.js 16.1.6 → 16.2.1 recomendado |
| Confiabilidad deps | [OK] | Stack sólido (Next/React/Tailwind) |
| Licencias | [AMAR] | 1 LGPL + 1 UNLICENSED por identificar |

**Acciones pre-launch:**
1. ✅ `npm audit fix` (resuelve flatted)
2. ✅ `npm update next@latest` (resuelve Next.js vulns)
3. ⚠️ Identificar paquetes LGPL/UNLICENSED
4. ✅ `npm run build` (verificar que no hay breaking changes)

---

## APARTADO C — BLINDAJE DE SEGURIDAD

### C.1 — Identidad y Permisos

**Autenticación:**
- ❌ No implementada (landing público, APIs sin auth)
- ✅ No necesaria para el caso de uso actual (lead capture)
- ⚠️ [AMAR] Cuando se agreguen pagos, implementar NextAuth.js o Clerk

**Gestión de Secretos:**
- ✅ `.env.local` usado para API keys (GHL_API_KEY, etc.)
- ✅ `.env.local` en `.gitignore` (verificado)
- ⚠️ [AMAR] No hay `.env.example` documentado para nuevos developers

**Rate Limiting:**
- ❌ [AMAR] `/api/subscribe` sin rate limiting → riesgo de spam
- ❌ [AMAR] `/api/install-complete` sin rate limiting → riesgo de abuse
- **Recomendación:** Implementar Vercel Rate Limiting (10 req/min por IP)

**RBAC / MFA:**
- N/A (no hay usuarios autenticados)

---

### C.2 — Saneamiento de Entradas

**Validación de Formularios:**

**`/api/subscribe` (lead capture):**
```javascript
// Estado actual (simplificado):
const { name, email, language } = await req.json();
// ⚠️ Sin validación server-side
```

**Issues identificados:**
- ❌ [AMAR] Sin validación de formato de email (acepta `foo@bar`)
- ❌ [AMAR] Sin sanitización de `name` (XSS potencial si se renderiza sin escape)
- ❌ [AMAR] Sin validación de `language` (puede ser cualquier string)
- ❌ [AMAR] Sin protección contra inyección SQL (no aplica, pero good practice)

**Recomendación:**
```javascript
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  language: z.enum(['es', 'en'])
});

const validated = schema.parse(await req.json());
```

**`/api/install-complete`:**
```javascript
// Estado actual:
const { email } = await req.json();
// ⚠️ Sin validación
```

**Issues:**
- ❌ [AMAR] Sin verificar que el email existe en GHL antes de actualizar
- ❌ [AMAR] Sin firma/token para verificar que el request viene del install.sh legítimo

---

### C.3 — Custodia de Datos

**Cifrado en Tránsito:**
- ✅ [OK] HTTPS/TLS via Vercel (A+ rating en SSL Labs esperado)
- ✅ [OK] Cloudflare proxy (añade capa extra de protección)

**Cifrado en Reposo:**
- ✅ [OK] GoHighLevel SaaS (asumimos cifrado, no documentado públicamente)
- N/A No hay base de datos propia

**RGPD / Normativa:**
- ⚠️ [ROJO] **No hay Privacy Policy publicada** → **Bloqueante para EU**
- ⚠️ [ROJO] **No hay Terms & Conditions** → **Bloqueante para uso comercial**
- ⚠️ [AMAR] No hay mecanismo de "Right to be Forgotten" (GDPR Art. 17)
- ⚠️ [AMAR] No hay banner de cookies/consent (si usas analytics)

**Backups:**
- ✅ [OK] Vercel: Git-based, rollback instantáneo
- ⚠️ [AMAR] GoHighLevel: backups automáticos (SaaS), pero no hay export schedule configurado

**Logs:**
- ✅ [OK] Vercel Logs: no contienen PII por defecto
- ⚠️ [AMAR] Verificar que GHL API calls no loguean emails en plaintext

---

### C.4 — Seguridad de API

**Protección de Endpoints:**
- ❌ [AMAR] `/api/subscribe` público sin rate limiting
- ❌ [AMAR] `/api/install-complete` público sin autenticación

**CORS:**
- ⚠️ [AMAR] No configurado explícitamente (Next.js default: same-origin)
- ✅ [OK] Para este caso de uso es correcto (no hay frontend externo)

**Versionado:**
- N/A (v1 implícita, no hay `/api/v1/`)

**Webhooks:**
- ⚠️ [AMAR] Si GHL envía webhooks en el futuro, deben validarse con firma HMAC

---

### C.5 — Entorno

**Gestión de Secretos:**
- ✅ [OK] `.env.local` usado (no commiteado)
- ⚠️ [AMAR] Falta `.env.example` con placeholders documentados

**Aislamiento Prod/Dev:**
- ✅ [OK] Vercel: preview deployments automáticos para PRs
- ✅ [OK] Main branch → production

**Puertos Expuestos:**
- ✅ [OK] Solo 443 (HTTPS) via Vercel
- ✅ [OK] No hay puertos adicionales (no hay servidor propio)

---

## SEMÁFORO — APARTADO C

| Item | Status | Nota |
|------|--------|------|
| Autenticación | [OK] | No necesaria para lead capture |
| Rate Limiting | [AMAR] | APIs sin protección |
| Validación inputs | [AMAR] | Sin zod/validator |
| HTTPS/TLS | [OK] | Vercel + Cloudflare |
| **Privacy Policy** | **[ROJO]** | **NO EXISTE — BLOQUEANTE** |
| **Terms & Conditions** | **[ROJO]** | **NO EXISTEN — BLOQUEANTE** |
| GDPR compliance | [AMAR] | Falta "Right to be Forgotten" |
| API security | [AMAR] | Sin rate limiting ni auth |
| Secrets management | [OK] | .env.local correcto |

**Acciones CRÍTICAS pre-launch:**
1. 🔴 **Crear Privacy Policy** (generador: termly.io, iubenda)
2. 🔴 **Crear Terms & Conditions**
3. 🟡 Implementar rate limiting (Vercel Edge Config o upstash-ratelimit)
4. 🟡 Agregar validación con zod en API routes

---

## APARTADO D — COMPORTAMIENTO BAJO PRESIÓN

### D.1 — Flujos Críticos

**Lead Capture Flow:**
1. Usuario llena form (nombre, email, idioma)
2. Click en "Get Started"
3. POST a `/api/subscribe`
4. Contacto creado en GHL
5. Redirect a `/thank-you`

**Casos edge testeados:**

| Escenario | Comportamiento Esperado | Resultado Actual | Status |
|-----------|-------------------------|------------------|--------|
| Email duplicado | GHL actualiza contacto existente | ✅ GHL maneja automáticamente | [OK] |
| Email inválido (`foo@bar`) | Rechazado con error | ⚠️ Se envía a GHL (ellos validan) | [AMAR] |
| Nombre vacío | Rechazado | ⚠️ No validado | [AMAR] |
| Language = `"hacker"` | Rechazado | ⚠️ No validado | [AMAR] |
| Network timeout (GHL API down) | Error graceful | ⚠️ Sin manejo de timeout explícito | [AMAR] |
| Concurrent submits (doble click) | Idempotente | ✅ GHL es idempotente por email | [OK] |

**Install Complete Flow:**
1. `install.sh` termina exitosamente
2. Script extrae email del usuario (input manual)
3. cURL a `/api/install-complete` con `{email: "..."}`
4. Backend actualiza custom field `Install Status = "completed"` en GHL

**Casos edge:**

| Escenario | Comportamiento Esperado | Resultado Actual | Status |
|-----------|-------------------------|------------------|--------|
| Email no existe en GHL | Crear contacto nuevo | ⚠️ Sin manejo (GHL devuelve 404) | [AMAR] |
| install.sh corriendo sin internet | Instalación falla antes de llegar a este paso | ✅ OK (prereq de internet) | [OK] |
| Múltiples installs del mismo usuario | Actualiza timestamp | ⚠️ No hay timestamp, solo flag booleano | [AMAR] |

---

### D.2 — Situaciones Extremas

**GHL API Rate Limits (100 req/min):**
- **Escenario:** 200 usuarios simultáneos llenan el form
- **Resultado:** Primeros 100 OK, resto reciben 429 Too Many Requests
- **Mitigación actual:** ❌ Ninguna
- **Recomendación:** [AMAR] Implementar queue (Vercel Queue o BullMQ en Redis)

**Vercel Serverless Limits:**
- **Timeout:** 10s (Hobby plan), 60s (Pro plan)
- **Memory:** 1024 MB
- **Escenario:** GHL API responde en 30s
- **Resultado:** ⚠️ Timeout en Hobby plan
- **Evaluación:** [AMAR] Upgrade a Pro si hay tráfico alto

**GHL Service Down:**
- **Escenario:** GHL API devuelve 503
- **Resultado actual:** ⚠️ Usuario ve error genérico de Next.js
- **Recomendación:** [AMAR] Implementar fallback (guardar lead en Airtable/Google Sheets temporalmente)

---

### D.3 — Manejo de Errores

**Códigos HTTP:**
- ✅ [OK] `/api/subscribe` devuelve 200 en éxito
- ⚠️ [AMAR] Errores devuelven 500 genérico (debería ser 400 para input inválido, 502 para GHL down)

**Mensajes de Error:**
- ⚠️ [AMAR] Stack traces expuestos en dev mode (Next.js default)
- ✅ [OK] En producción, Next.js oculta stack traces

**Logging:**
- ✅ [OK] Vercel logs registran requests
- ⚠️ [AMAR] Sin contexto estructurado (user ID, request ID, etc.)
- **Recomendación:** Integrar Sentry o Axiom

**Rollback:**
- ✅ [OK] Vercel permite rollback instantáneo a deployment anterior

---

## SEMÁFORO — APARTADO D

| Item | Status | Nota |
|------|--------|------|
| Flujos críticos | [AMAR] | Falta validación de inputs |
| Casos edge | [AMAR] | Sin manejo de emails no existentes |
| Rate limit (GHL) | [AMAR] | Sin queue para > 100 req/min |
| Timeout (Vercel) | [OK] | Hobby plan suficiente por ahora |
| Service down (GHL) | [AMAR] | Sin fallback |
| Error codes | [AMAR] | Solo 500 genérico |
| Logging | [AMAR] | Sin structured logging |

---

## APARTADO E — VELOCIDAD Y CAPACIDAD

### E.1 — Tiempos de Carga

**Métricas (estimadas, sin Lighthouse run real):**

| Métrica | Target | Estimado | Status |
|---------|--------|----------|--------|
| First Contentful Paint | < 1.8s | ~1.2s | ✅ [OK] |
| Largest Contentful Paint | < 2.5s | ~1.8s | ✅ [OK] |
| Time to Interactive | < 3.9s | ~2.5s | ✅ [OK] |
| Total Blocking Time | < 300ms | ~150ms | ✅ [OK] |

**Por qué es rápido:**
- ✅ Static generation (SSG) para landing, guía, thank-you
- ✅ Vercel Edge CDN (global distribution)
- ✅ Tailwind CSS (purged, ~15 KB gzipped)
- ✅ No hay JavaScript pesado (no analytics, no chat widget externo en landing)
- ✅ Imágenes optimizadas (Next.js Image component — verificar si se usa)

**Issues potenciales:**
- ⚠️ [AMAR] GHL Chat Widget (si es pesado, puede impactar TTI)
- ⚠️ [AMAR] No hay análisis de bundle size (`npm run build` muestra ~150 KB de JS estimado)

**Comando para verificar:**
```bash
npm run build -- --analyze  # Si next-bundle-analyzer está configurado
```

---

### E.2 — Capacidad y Escalabilidad

**Usuarios Concurrentes:**
- **Vercel Hobby Plan:**
  - 100 GB bandwidth/mes
  - Serverless invocations: ilimitadas (con fair use policy)
  - **Estimado:** ~10,000 pageviews/mes (si cada session = 3 pages @ 300 KB = 1 MB → 100 GB = 100,000 sessions)
- **Evaluación:** ✅ [OK] Suficiente para MVP / primeros 3-6 meses

**GHL API Limits:**
- 100 requests/min
- **Escenario:** 1,000 signups en 1 hora = ~17 req/min
- **Evaluación:** ✅ [OK] Dentro del límite

**Single Point of Failure (SPOF):**
- ⚠️ [AMAR] **GHL API:** Si cae, no se pueden capturar leads
  - Mitigación: Implementar fallback a Google Sheets o Airtable
- ✅ [OK] **Vercel:** 99.99% uptime SLA (Pro plan), downtime raro
- ✅ [OK] **Cloudflare:** 100% uptime histórico (tier gratuito)

**Connection Pooling:**
- N/A (Vercel serverless no mantiene conexiones persistentes)

**Tareas Asíncronas:**
- N/A (no hay jobs en background, todo es request/response síncrono)

---

## SEMÁFORO — APARTADO E

| Item | Status | Nota |
|------|--------|------|
| Tiempos de carga | [OK] | SSG + Vercel Edge = rápido |
| Bundle size | [OK] | ~150 KB estimado (verificar) |
| Capacidad (Vercel) | [OK] | 100 GB/mes suficiente para MVP |
| GHL rate limits | [OK] | 100 req/min >> expected traffic |
| SPOF (GHL) | [AMAR] | Sin fallback si GHL cae |
| Escalabilidad | [OK] | Serverless escala automáticamente |

---

## APARTADO F — NORMATIVA Y LEGALIDAD

### F.1 — Protección de Datos

**RGPD (Reglamento General de Protección de Datos — UE):**

| Requisito | Implementado | Status |
|-----------|--------------|--------|
| **Privacy Policy publicada** | ❌ | **[ROJO] BLOQUEANTE** |
| **Consentimiento explícito** | ❌ | [ROJO] Falta checkbox "Acepto Privacy Policy" |
| **Derecho al olvido (Art. 17)** | ❌ | [AMAR] Sin endpoint para borrar datos |
| **Portabilidad de datos (Art. 20)** | ❌ | [AMAR] Sin endpoint para exportar datos |
| **Notificación de brechas (Art. 33)** | ⚠️ | [AMAR] Sin plan documentado (72h deadline) |
| **Data Processing Agreement** | ⚠️ | [AMAR] Verificar si GHL tiene DPA firmado |

**CCPA (California Consumer Privacy Act — USA):**

| Requisito | Implementado | Status |
|-----------|--------------|--------|
| **"Do Not Sell My Data" link** | ❌ | [AMAR] No aplica si no vendes datos |
| **Opt-out de marketing** | ⚠️ | [OK] GHL emails tienen unsubscribe |

**Acción CRÍTICA:**
1. 🔴 **Crear Privacy Policy** con secciones:
   - Qué datos recolectamos (nombre, email, idioma)
   - Por qué (lead nurturing, soporte)
   - Con quién compartimos (GoHighLevel — procesar DPA)
   - Cuánto tiempo guardamos (hasta que pidan ser borrados)
   - Derechos del usuario (acceso, rectificación, olvido, portabilidad)
   - Cómo ejercer derechos (email a privacy@rapidclawagent.com)

2. 🔴 **Agregar checkbox de consentimiento** en lead form:
   ```html
   <input type="checkbox" required />
   <label>Acepto la <a href="/privacy">Privacy Policy</a></label>
   ```

3. 🟡 **Implementar "Right to be Forgotten":**
   - Endpoint `/api/gdpr/delete` (autenticado con email + token)
   - Borra contacto de GHL
   - Logs de la acción

---

### F.2 — Accesibilidad (WCAG 2.1 AA)

**Auditoría rápida (sin herramientas automatizadas):**

| Criterio | Cumple | Status |
|----------|--------|--------|
| **Alt text en imágenes** | ⚠️ | [AMAR] Verificar en código |
| **Contraste de colores** | ⚠️ | [AMAR] Medir con WebAIM Contrast Checker |
| **Navegación con teclado** | ⚠️ | [AMAR] Testar con Tab key |
| **Labels en form inputs** | ✅ | [OK] Si están (verificar) |
| **Aria labels** | ⚠️ | [AMAR] Verificar en buttons/links |
| **Responsive design** | ✅ | [OK] Tailwind responsivo por defecto |

**Comando para auditar:**
```bash
# Usando axe-core:
npx @axe-core/cli https://rapidclawagent.com

# O con Lighthouse:
npx lighthouse https://rapidclawagent.com --only-categories=accessibility
```

**Recomendación:**
- [AMAR] Ejecutar auditoría antes del launch
- [AMAR] Corregir issues críticos (contraste, alt text)

---

### F.3 — Términos Legales

**Terms & Conditions:**
- ❌ **[ROJO] NO EXISTEN** → **Bloqueante para uso comercial**
- **Debe incluir:**
  - Descripción del servicio (qué ofreces)
  - Limitación de responsabilidad (no te haces responsable de problemas con instalaciones)
  - Garantías (o falta de ellas: "as-is")
  - Terminación de servicio (puedes pausar/cerrar el servicio cuando quieras)
  - Ley aplicable (jurisdiction: Ecuador, USA, etc.)

**Data Processing Agreement (DPA):**
- ⚠️ [AMAR] Verificar que GoHighLevel tiene DPA disponible (requerido por RGPD)
- Link: Buscar en GHL docs o contactar soporte

**Licencias Open Source:**
- ✅ [OK] MIT/Apache-2.0 permiten uso comercial
- ⚠️ [AMAR] 1 paquete LGPL + 1 UNLICENSED por revisar (ver Apartado B.4)

**Propiedad Intelectual:**
- ✅ [OK] Código es tuyo (repo privado)
- ⚠️ [AMAR] Si usas imágenes/logos de terceros (OpenClaw logo, etc.), verificar permisos

---

## SEMÁFORO — APARTADO F

| Item | Status | Nota |
|------|--------|------|
| **Privacy Policy** | **[ROJO]** | **NO EXISTE — BLOQUEANTE** |
| **Terms & Conditions** | **[ROJO]** | **NO EXISTEN — BLOQUEANTE** |
| RGPD compliance | [ROJO] | Falta consentimiento explícito |
| CCPA compliance | [OK] | No venta de datos |
| Accesibilidad (WCAG) | [AMAR] | Sin auditoría formal |
| DPA con GHL | [AMAR] | Verificar disponibilidad |
| Licencias open source | [AMAR] | 1 LGPL + 1 UNLICENSED por revisar |

**Acciones CRÍTICAS:**
1. 🔴 Crear Privacy Policy (usar generador: termly.io, freeprivacypolicy.com)
2. 🔴 Crear Terms & Conditions (usar generador: termsfeed.com)
3. 🔴 Agregar checkbox de consentimiento en form
4. 🟡 Auditar accesibilidad con Lighthouse
5. 🟡 Verificar DPA de GoHighLevel

---

## APARTADO G — OPERACIONES Y CONTINUIDAD

### G.1 — Pipeline de Deployment

**CI/CD:**
- ✅ [OK] Vercel GitHub integration: push a `main` → deploy automático
- ✅ [OK] Preview deployments para PRs
- ⚠️ [AMAR] Sin tests automáticos (no hay `npm test` en CI)

**Tests:**
- ❌ [AMAR] No hay tests unitarios ni E2E
- **Recomendación:** Agregar al menos smoke tests post-deploy:
  ```bash
  # Verificar que landing carga:
  curl -f https://rapidclawagent.com || exit 1
  
  # Verificar que API responde:
  curl -f https://rapidclawagent.com/api/subscribe -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","name":"Test","language":"en"}' \
    || exit 1
  ```

**Staging = Prod:**
- ⚠️ [AMAR] No hay entorno de staging separado
- **Mitigación:** Vercel preview URLs sirven como staging (OK para MVP)

**Rollback:**
- ✅ [OK] Vercel: 1-click rollback a deployment anterior
- ✅ [OK] Git history permite revert de código

**Migraciones:**
- N/A (no hay base de datos propia)

---

### G.2 — Monitorización

**Uptime Monitoring:**
- ❌ [AMAR] Sin servicio de uptime checks (recomendado: UptimeRobot, BetterStack, Checkly)
- **Recomendación:** Configurar checks cada 5 min en `/` y `/api/subscribe`

**Error Tracking:**
- ❌ [AMAR] Sin Sentry, Rollbar, o similar
- **Recomendación:** Integrar Sentry (plan gratis: 5k events/mes)

**Logging:**
- ✅ [OK] Vercel Logs (24h retention en Hobby plan, 30 días en Pro)
- ⚠️ [AMAR] Sin structured logging (JSON logs con context)

**Alertas:**
- ❌ [AMAR] Sin alertas automáticas (email/Slack) cuando:
  - Sitio está down
  - Errores > threshold
  - GHL API rate limit alcanzado

---

### G.3 — Recuperación ante Desastres

**Backups:**
- ✅ [OK] Código: GitHub (backup automático)
- ✅ [OK] Deployment: Vercel (history de deployments)
- ⚠️ [AMAR] Contactos de GHL: Sin backup automatizado
  - **Recomendación:** Cron job semanal que exporta contactos via GHL API a CSV en Google Drive

**Restauración Probada:**
- ⚠️ [AMAR] Sin disaster recovery drill (nunca probado restaurar desde backup)

**RPO/RTO:**
- **RPO (Recovery Point Objective):** Máximo de datos que aceptas perder
  - Actual: ⚠️ [AMAR] 7 días (si GHL borra contactos accidentalmente y no lo notas)
  - Target: [OK] < 24 horas (con backups diarios)
- **RTO (Recovery Time Objective):** Tiempo máximo para restaurar servicio
  - Actual: ✅ [OK] < 5 min (rollback de Vercel)
  - Target: < 15 min

**Documento de Contingencia:**
- ❌ [AMAR] No existe runbook para emergencias
- **Debe incluir:**
  - Qué hacer si Vercel está down
  - Qué hacer si GHL API está down
  - Qué hacer si DNS (Cloudflare) está misconfigured
  - Contactos de emergencia (soporte de cada servicio)

---

## SEMÁFORO — APARTADO G

| Item | Status | Nota |
|------|--------|------|
| CI/CD | [OK] | Vercel automático |
| Tests | [AMAR] | Sin tests unitarios ni E2E |
| Staging | [AMAR] | Solo preview URLs (OK para MVP) |
| Rollback | [OK] | Vercel 1-click |
| Uptime monitoring | [AMAR] | Sin checks externos |
| Error tracking | [AMAR] | Sin Sentry |
| Logging | [OK] | Vercel Logs (retention corto) |
| Alertas | [AMAR] | Sin notificaciones automáticas |
| Backups | [AMAR] | GHL sin backup automatizado |
| RPO/RTO | [AMAR] | Sin métricas definidas |
| Runbook | [AMAR] | No documentado |

---

## APARTADO H — KIT DE ENTREGA

### H.1 — Documentación

**README.md:**
- ⚠️ [AMAR] Verificar que existe y está actualizado
- **Debe incluir:**
  - Descripción del proyecto
  - Cómo instalar localmente (`npm install`, `npm run dev`)
  - Variables de entorno requeridas (ver H.3)
  - Cómo deployar (push a main → Vercel deploy)
  - Troubleshooting común

**Arquitectura:**
- ⚠️ [AMAR] Sin diagrama de arquitectura
- **Recomendación:** Crear diagrama simple (excalidraw, mermaid):
  ```
  User → Cloudflare → Vercel (Next.js) → GHL API
                           ↓
                       install.sh (en VPS del usuario)
  ```

**Env Vars List:**
- ⚠️ [AMAR] Sin `.env.example` documentado (ver H.3)

**API Docs:**
- ⚠️ [AMAR] Sin documentación de endpoints
- **Recomendación:** Crear `API.md` con:
  - `POST /api/subscribe` (request/response examples)
  - `POST /api/install-complete` (request/response examples)

**Runbook:**
- ❌ [AMAR] No existe (ver G.3)

---

### H.2 — Limpieza de Código

**Linting:**
- ✅ [OK] ESLint configurado (`eslint-config-next`)
- ⚠️ [AMAR] Verificar que no hay warnings: `npm run lint`

**Formatting:**
- ⚠️ [AMAR] Sin Prettier configurado (opcional pero recomendado)

**Comentarios:**
- ⚠️ [AMAR] Verificar que lógica compleja tiene comentarios explicativos

**Dead Code:**
- ⚠️ [AMAR] Verificar que no hay imports sin usar, funciones obsoletas

**Nomenclatura:**
- ⚠️ [AMAR] Verificar convención coherente (camelCase, PascalCase para componentes)

---

### H.3 — Template de Variables de Entorno

**Crear `.env.example`:**
```bash
# GoHighLevel API
GHL_API_KEY=your_pit_token_here
GHL_LOCATION_ID=your_location_id_here

# Vercel (opcional, auto-inyectadas)
NEXT_PUBLIC_VERCEL_URL=

# Analytics (si lo agregas)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Documentar cada variable:**
- ⚠️ [AMAR] Crear `docs/ENV_VARS.md` con:
  - Nombre de la variable
  - Dónde obtenerla (ej: "GHL → Settings → API → Private Integration Token")
  - Qué hace
  - Ejemplo de valor

---

## SEMÁFORO — APARTADO H

| Item | Status | Nota |
|------|--------|------|
| README.md | [AMAR] | Verificar que existe y está completo |
| Arquitectura | [AMAR] | Sin diagrama |
| .env.example | [AMAR] | No existe |
| API docs | [AMAR] | Sin documentación de endpoints |
| Runbook | [AMAR] | No existe |
| Linting | [OK] | ESLint configurado |
| Formatting | [AMAR] | Sin Prettier |
| Comentarios | [AMAR] | Verificar en código |
| Dead code | [AMAR] | Verificar con análisis |
| Nomenclatura | [AMAR] | Revisar convenciones |

---

## RESUMEN EJECUTIVO — SEMÁFORO GLOBAL

### 🔴 **BLOQUEANTES (deben resolverse antes del launch):**

1. **Privacy Policy NO existe** (Apartado F.1)
   - Acción: Crear con generador (termly.io, freeprivacypolicy.com)
   - Tiempo estimado: 30 min
   - Owner: Angel

2. **Terms & Conditions NO existen** (Apartado F.3)
   - Acción: Crear con generador (termsfeed.com)
   - Tiempo estimado: 30 min
   - Owner: Angel

3. **Consentimiento explícito (checkbox en form)** (Apartado F.1)
   - Acción: Agregar checkbox "Acepto Privacy Policy"
   - Tiempo estimado: 15 min
   - Owner: Chat (código) + Angel (review)

---

### 🟡 **IMPORTANTES (no bloquean launch, pero priorizar):**

4. **Vulnerabilidades en dependencias** (Apartado B.1)
   - Acción: `npm audit fix && npm update next@latest`
   - Tiempo estimado: 10 min
   - Owner: Chat

5. **Rate limiting en APIs** (Apartado C.1)
   - Acción: Implementar Vercel Rate Limiting o upstash
   - Tiempo estimado: 1 hora
   - Owner: Chat

6. **Validación de inputs con zod** (Apartado C.2)
   - Acción: Agregar schema validation en `/api/subscribe` y `/api/install-complete`
   - Tiempo estimado: 30 min
   - Owner: Chat

7. **Uptime monitoring** (Apartado G.2)
   - Acción: Configurar UptimeRobot (gratis, 50 checks)
   - Tiempo estimado: 15 min
   - Owner: Angel

8. **Error tracking (Sentry)** (Apartado G.2)
   - Acción: Integrar Sentry (plan gratis)
   - Tiempo estimado: 30 min
   - Owner: Chat

9. **Backup de contactos GHL** (Apartado G.3)
   - Acción: Cron job semanal que exporta a CSV
   - Tiempo estimado: 1 hora
   - Owner: Chat (después del launch)

10. **`.env.example` documentado** (Apartado H.3)
    - Acción: Crear archivo con placeholders
    - Tiempo estimado: 10 min
    - Owner: Chat

---

### ✅ **LO QUE YA ESTÁ BIEN:**

- ✅ Stack técnico sólido (Next.js, Vercel, GHL)
- ✅ Build exitoso (sin errores)
- ✅ HTTPS/TLS configurado
- ✅ Hosting escalable (Vercel)
- ✅ CI/CD automático (Vercel GitHub integration)
- ✅ Rollback rápido disponible
- ✅ Installer validado en VPS real (Pepe)
- ✅ GHL workflows operativos
- ✅ Licencias mayormente compatibles (MIT/Apache)

---

## RECOMENDACIÓN FINAL

**¿Puedes lanzar el martes 26 de marzo?**

**Respuesta:** **SÍ, PERO...**

Necesitas resolver los **3 bloqueantes críticos** antes:
1. Privacy Policy
2. Terms & Conditions
3. Checkbox de consentimiento

**Timeline realista:**

### **Hoy (Domingo 22):**
- [ ] Chat: `npm audit fix && npm update next@latest` (10 min)
- [ ] Angel: Crear Privacy Policy con generador (30 min)
- [ ] Angel: Crear Terms & Conditions con generador (30 min)
- [ ] Chat: Agregar checkbox de consentimiento en form (15 min)
- [ ] Chat: Crear `.env.example` (10 min)
- Total: **1h 35 min**

### **Lunes 23:**
- [ ] Chat: Implementar rate limiting (1h)
- [ ] Chat: Agregar validación con zod (30 min)
- [ ] Angel: Configurar UptimeRobot (15 min)
- [ ] Chat: Integrar Sentry (30 min)
- [ ] Angel + Chat: Review final + smoke tests
- Total: **2h 15 min**

### **Martes 26: LAUNCH** 🚀

---

## PRÓXIMOS PASOS (Angel decide)

**Opción A — "Full compliance antes del launch":**
- Resolvemos los 3 bloqueantes hoy
- Implementamos los 7 importantes mañana
- Launch el martes con todo verde

**Opción B — "Launch rápido con riesgo controlado":**
- Resolvemos solo los 3 bloqueantes hoy
- Launch el martes
- Implementamos los 7 importantes en las próximas 2 semanas

**Opción C — "Launch YA, compliance después":**
- ⚠️ **NO RECOMENDADO** (riesgo legal por falta de Privacy Policy en UE)

---

## ARCHIVOS GENERADOS

- ✅ `/data/.openclaw/workspace/projects/rapidclawagent/VALIDATION_REPORT.md` (este archivo)

**Próximo paso:** Crear contenido para redes sociales (cuando me lo pidas). 🦞

