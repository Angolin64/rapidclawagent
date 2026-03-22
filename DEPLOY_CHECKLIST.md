# 🚀 Deploy Checklist — RapidClawAgent

**Status:** ✅ LISTO PARA DEPLOY  
**Fecha:** 2026-03-22  
**Target Launch:** Martes 2026-03-26

---

## ✅ PRE-DEPLOY (ya completado)

### Legal Compliance
- [x] Privacy Policy creada (`/privacy`)
- [x] Terms & Conditions creados (`/terms`)
- [x] GDPR consent checkbox en lead form
- [x] RGPD compliant (EU)
- [x] CCPA compliant (California)

### Seguridad
- [x] npm vulnerabilities resueltas (2 → 0)
- [x] Next.js actualizado (16.1.6 → 16.2.1)
- [x] Build verificado exitoso
- [x] Localhost test OK (`/privacy` y `/terms` funcionan)

### Documentación
- [x] `.env.example` creado
- [x] `VALIDATION_REPORT.md` completo
- [x] `LEGAL_COMPLIANCE_COMPLETE.md` completo
- [x] Commit listo para push

---

## 🔥 DEPLOY AHORA

### 1. Push a GitHub
```bash
cd /data/.openclaw/workspace/projects/rapidclawagent
git push origin main
```

**Resultado esperado:**
- Vercel detecta el push automáticamente
- Build inicia en ~30 segundos
- Deploy completo en ~2-3 minutos
- URL: https://rapidclawagent.com

### 2. Verificar en Producción (5 min después del deploy)

**URLs a testear:**
- ✅ https://rapidclawagent.com (landing)
- ✅ https://rapidclawagent.com/privacy (Privacy Policy)
- ✅ https://rapidclawagent.com/terms (Terms & Conditions)
- ✅ https://rapidclawagent.com/thank-you (thank you page)
- ✅ https://rapidclawagent.com/guia (installer guide)

**Tests funcionales:**
1. **Lead Form:**
   - Llenar form SIN marcar checkbox → debe mostrar error del navegador (campo required)
   - Llenar form CON checkbox marcado → debe enviar a GHL y redirect a `/thank-you`
   - Verificar que contacto llega a GHL con los 3 campos (nombre, email, idioma)

2. **Legal Pages:**
   - Verificar que `/privacy` y `/terms` se cargan completamente (sin 404)
   - Verificar que links en el checkbox abren en nueva pestaña
   - Verificar que el contenido Markdown se renderiza correctamente (no raw MD)

3. **Email de Bienvenida:**
   - Después de submit, verificar que llega el email "Welcome to RapidClawAgent"
   - Verificar que el workflow de GHL se activó (4 emails programados)

---

## 📧 POST-DEPLOY INMEDIATO

### Configurar Aliases de Email (5 min)

**Necesitas crear estos forwarders:**
1. `privacy@rapidclawagent.com` → tu email personal
2. `legal@rapidclawagent.com` → tu email personal
3. `support@rapidclawagent.com` → tu email personal

**Opciones:**
- **Cloudflare Email Routing** (gratis, recomendado)
  - Cloudflare Dashboard → Email → Email Routing → Create address
- **Hostinger Email** (si tienes hosting con email)
- **Google Workspace** (si usas Gmail empresarial)

**Verificación:**
- Envía un email de prueba a cada alias
- Confirma que llega a tu inbox

---

## 🟡 POST-DEPLOY OPCIONAL (esta semana)

### Mejoras No Bloqueantes

#### 1. Rate Limiting (1h)
**Por qué:** Proteger APIs de spam/abuse  
**Herramienta:** Upstash Redis (gratis) o Vercel Edge Config  
**Endpoints:** `/api/subscribe`, `/api/install-complete`  
**Límite recomendado:** 10 requests/min por IP

#### 2. Validación con Zod (30 min)
**Por qué:** Validación server-side robusta  
**Implementación:**
```typescript
import { z } from 'zod';
const schema = z.object({
  firstName: z.string().min(2).max(100),
  email: z.string().email(),
  language: z.enum(['en', 'es']),
  consent: z.literal(true)
});
```

#### 3. Uptime Monitoring (15 min)
**Herramienta:** UptimeRobot (gratis, 50 checks)  
**Setup:**
- Check cada 5 min: `https://rapidclawagent.com`
- Check cada 5 min: `https://rapidclawagent.com/api/subscribe` (POST)
- Alertas por email si down > 2 min

#### 4. Error Tracking (30 min)
**Herramienta:** Sentry (gratis, 5k events/mes)  
**Setup:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```
**Beneficios:** Stack traces, error reports, performance monitoring

#### 5. Backup de Contactos GHL (1h)
**Cron job semanal:**
```bash
# Export contacts via GHL API → CSV → Google Drive
# Frecuencia: Todos los domingos 3:00 AM
```

---

## 📊 MÉTRICAS A MONITOREAR (post-launch)

### Día 1-3
- **Installs completados:** Meta 10-20
- **Leads capturados:** Meta 50-100
- **Tasa de conversión form:** Meta >70%
- **Errores 500:** Meta 0
- **Uptime:** Meta 99.9%

### Semana 1
- **Installs completados:** Meta 50-100
- **Emails abiertos (GHL):** Meta >40%
- **Support queries:** Clasificar y documentar FAQs comunes
- **Feedback cualitativo:** Recopilar en Notion/Airtable

---

## 🎯 LAUNCH PLAN (Martes 26)

### Pre-Launch (Lunes 25)
- [ ] Verificar que todo funciona en producción (post-deploy de hoy)
- [ ] Preparar contenido para redes sociales (X, LinkedIn, Reddit, Product Hunt)
- [ ] Programar posts para martes AM (8:00-10:00 AM EST)
- [ ] Avisar a early testers (Pepe, otros amigos)

### Launch Day (Martes 26)
- [ ] 8:00 AM: Post en X/Twitter (thread con demo)
- [ ] 9:00 AM: Post en LinkedIn (más profesional, ROI focus)
- [ ] 10:00 AM: Post en Reddit (r/selfhosted, r/opensource)
- [ ] 12:00 PM: Submit a Product Hunt
- [ ] 3:00 PM: Follow-up en X con primeros testimonials/metrics
- [ ] 6:00 PM: Responder comentarios, agradecer early adopters

### Post-Launch (Miércoles 27+)
- [ ] Monitorear métricas diariamente
- [ ] Responder a support queries < 24h
- [ ] Iterar basado en feedback
- [ ] Documentar issues comunes en knowledge base

---

## 🆘 TROUBLESHOOTING

### Si Vercel Deploy Falla
1. Revisar logs en Vercel Dashboard
2. Verificar que `.env` variables están configuradas en Vercel (Settings → Environment Variables)
3. Si falla el build:
   ```bash
   npm run build  # Verificar localmente primero
   ```

### Si `/privacy` o `/terms` dan 404
1. Verificar que `content/PRIVACY_POLICY.md` existe en el repo
2. Verificar que Vercel incluye la carpeta `content/` en el deploy
3. Si no, agregar `content/` a `next.config.js`:
   ```javascript
   module.exports = {
     webpack: (config) => {
       config.resolve.alias['@/content'] = path.join(__dirname, 'content');
       return config;
     }
   };
   ```

### Si el Form no Envía a GHL
1. Verificar variables de entorno en Vercel:
   - `GHL_API_KEY` (PIT token)
   - `GHL_LOCATION_ID`
2. Revisar logs de `/api/subscribe` en Vercel Functions
3. Testear API call manualmente:
   ```bash
   curl -X POST https://rapidclawagent.com/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","email":"test@example.com","language":"en","consent":true}'
   ```

### Si GHL Emails no Llegan
1. Verificar que el workflow "Onboarding" está Published (no draft)
2. Verificar que el contacto se creó en GHL con status "New Lead"
3. Verificar que el trigger del workflow es "Contact Created"
4. Revisar email logs en GHL → Conversations

---

## 📞 CONTACTOS DE SOPORTE

**Vercel Support:**
- Dashboard: https://vercel.com/support
- Status: https://vercel-status.com

**GoHighLevel Support:**
- Email: support@gohighlevel.com
- Dashboard: https://app.gohighlevel.com

**Cloudflare Support:**
- Dashboard: https://dash.cloudflare.com
- Status: https://www.cloudflarestatus.com

**OpenClaw Community:**
- Discord: https://discord.com/invite/clawd
- GitHub: https://github.com/openclaw/openclaw/issues

---

## ✅ FINAL CHECKLIST

Antes de hacer `git push`:

- [x] Build exitoso localmente
- [x] `/privacy` y `/terms` funcionan en localhost
- [x] Commit listo
- [ ] Push a GitHub (`git push origin main`)
- [ ] Wait 3 min para Vercel deploy
- [ ] Verificar en producción (URLs listadas arriba)
- [ ] Configurar aliases de email
- [ ] Celebrar 🎉

---

**¿Listo para hacer push? Ejecuta:**
```bash
git push origin main
```

**Vercel auto-deploy en ~3 minutos.** 🚀
