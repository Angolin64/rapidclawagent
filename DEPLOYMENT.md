# Deployment Guide

Complete checklist to take RapidClawAgent from local dev to live production.

---

## 📋 Pre-Deploy Checklist

### ✅ Development Complete
- [x] Install script working (`public/install.sh`)
- [x] Landing page built (`app/page.tsx`)
- [x] Cost estimator functional
- [x] Preset templates defined
- [x] Documentation written
- [x] Git repo initialized

### ⏳ Pre-Production Testing
- [ ] Test install script on fresh VPS (Hostinger/Hetzner/DO)
- [ ] Verify all 3 presets work correctly
- [ ] Test with different API key combinations
- [ ] Confirm OpenClaw starts successfully
- [ ] Test Telegram/WhatsApp integration
- [ ] Verify cost calculations are accurate

---

## 🌐 Domain Setup

### 1. Purchase Domain
**Recommended:** Namecheap, Porkbun, or Cloudflare Registrar

```bash
# Cost: ~$10-15/year
Domain: rapidclawagent.com
```

**Action items:**
- [ ] Purchase `rapidclawagent.com`
- [ ] Enable domain privacy (WHOIS protection)
- [ ] Configure nameservers (point to Vercel)

### 2. DNS Configuration

Once domain is purchased, configure DNS:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | cname.vercel-dns.com | Auto |
| CNAME | www | cname.vercel-dns.com | Auto |

---

## 🚀 Vercel Deployment

### 1. Push to GitHub

```bash
# Create GitHub repo
gh repo create rapidclawagent --public --source=. --remote=origin --push

# Or manually:
git remote add origin https://github.com/yourusername/rapidclawagent.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub
3. Select `rapidclawagent` repo
4. Framework Preset: **Next.js**
5. Root Directory: `.`
6. Build Command: `npm run build` (default)
7. Output Directory: `.next` (default)
8. Click **Deploy**

### 3. Configure Custom Domain

In Vercel dashboard:
1. Go to project settings → Domains
2. Add `rapidclawagent.com`
3. Add `www.rapidclawagent.com` (redirects to main)
4. Wait for DNS propagation (~5-60 minutes)

---

## 📦 Install Script Hosting

The install script needs to be accessible via:
```bash
curl -sSL https://rapidclawagent.com/install.sh
```

Vercel serves static files from `/public`, so:
- ✅ `public/install.sh` → `https://rapidclawagent.com/install.sh`

**Test it:**
```bash
curl -sSL https://rapidclawagent.com/install.sh | head -n 20
```

Should show the script header.

---

## 🧪 Post-Deploy Testing

### 1. Test Website
- [ ] Visit `https://rapidclawagent.com`
- [ ] Verify landing page loads correctly
- [ ] Test cost estimator (slider, calculations)
- [ ] Click all buttons/links
- [ ] Test on mobile (responsive design)
- [ ] Check Lighthouse score (aim for 90+)

### 2. Test Install Script
```bash
# Download only (don't run)
curl -sSL https://rapidclawagent.com/install.sh -o /tmp/test-install.sh
bash -n /tmp/test-install.sh  # Syntax check

# Full test on fresh VPS
ssh your-vps
curl -sSL https://rapidclawagent.com/install.sh | bash
```

### 3. Verify SEO
- [ ] Meta tags present (title, description, OG tags)
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] favicon.ico loads

---

## 📊 Analytics (Optional)

### Vercel Analytics
Already included in Vercel deployments (free tier).

### Google Analytics
Add to `app/layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

### Plausible (Privacy-focused)
Add to `app/layout.tsx`:
```tsx
<Script
  defer
  data-domain="rapidclawagent.com"
  src="https://plausible.io/js/script.js"
/>
```

---

## 🎯 Launch Checklist

### Pre-Launch (Day -1)
- [ ] Complete all testing
- [ ] Prepare launch tweet thread
- [ ] Write Product Hunt submission
- [ ] Create demo video (3-5 min)
- [ ] Schedule launch announcement

### Launch Day
- [ ] Submit to Product Hunt (early morning PST)
- [ ] Post on Twitter (thread + engagement)
- [ ] Share in Discord (OpenClaw community)
- [ ] Post to Reddit (r/selfhosted, r/LocalLLaMA)
- [ ] Share on Hacker News (Show HN)

### Post-Launch (Week 1)
- [ ] Monitor analytics
- [ ] Respond to comments/questions
- [ ] Fix bugs reported by users
- [ ] Gather testimonials
- [ ] Write launch recap blog post

---

## 🔧 Maintenance

### Weekly
- [ ] Check website uptime
- [ ] Review analytics
- [ ] Update preset costs if model pricing changes
- [ ] Monitor GitHub issues

### Monthly
- [ ] Update dependencies (`npm update`)
- [ ] Test install script on latest Ubuntu
- [ ] Review and respond to user feedback
- [ ] Plan new features

---

## 🐛 Troubleshooting

### Install script 404
**Problem:** `curl https://rapidclawagent.com/install.sh` returns 404

**Solution:**
- Check `public/install.sh` exists in repo
- Verify Vercel build succeeded
- Check file permissions (should be 755)

### Website not loading
**Problem:** Domain shows "DNS not found"

**Solution:**
- Wait for DNS propagation (can take 24-48 hours)
- Check Vercel domain settings
- Verify nameservers point to Vercel

### Cost estimator broken
**Problem:** Calculator shows NaN or wrong numbers

**Solution:**
- Check `lib/presets.ts` model pricing
- Verify `calculateMonthlyCost()` logic
- Test with different slider values

---

## 💰 Monetization Setup (Phase 3)

### Stripe Integration
1. Create Stripe account
2. Add API keys to Vercel env vars
3. Create subscription products ($9/mo Pro tier)

### Dashboard Backend
1. Add auth (NextAuth.js)
2. Database (Supabase or PlanetScale)
3. Cost tracking API routes

### Affiliate Links
Replace VPS provider links with affiliate URLs:
- Hostinger: Get affiliate link
- Hetzner: Apply for partnership
- DigitalOcean: Use referral program

---

## 📈 Growth Tactics

### SEO
- Submit sitemap to Google Search Console
- Get backlinks from AI blogs
- Write guest posts on relevant sites

### Content Marketing
- Weekly blog posts (cost optimization tips)
- YouTube tutorials
- Twitter threads with tips

### Community Engagement
- Answer questions on Reddit/Discord
- Contribute to OpenClaw issues
- Share user success stories

---

## 🎉 Success Metrics

Track these KPIs:

| Metric | Week 1 | Month 1 | Month 3 |
|--------|--------|---------|---------|
| Website visits | 100 | 500 | 2,000 |
| Installs | 10 | 50 | 200 |
| GitHub stars | 5 | 25 | 100 |
| Twitter followers | 20 | 100 | 500 |
| Paying users | 0 | 5 | 25 |
| MRR | $0 | $45 | $225 |

---

## 🚨 Emergency Rollback

If deploy breaks production:

```bash
# Revert to previous Vercel deployment
vercel rollback

# Or via dashboard:
# Project → Deployments → Click previous deploy → Promote to Production
```

For install script issues:
1. Fix locally
2. Push to GitHub
3. Vercel auto-deploys
4. Test new version immediately

---

## ✅ Final Pre-Launch Checklist

Print this and check off each item:

### Code & Testing
- [ ] Install script tested on 3 fresh VPS providers
- [ ] All 3 presets install successfully
- [ ] Website loads < 2 seconds
- [ ] Mobile responsive (test on iPhone/Android)
- [ ] Lighthouse score 90+ (performance, accessibility, SEO)

### Domain & Hosting
- [ ] Domain purchased and configured
- [ ] Vercel deployment successful
- [ ] Custom domain working (https://rapidclawagent.com)
- [ ] SSL certificate valid

### Content
- [ ] README.md complete
- [ ] Demo video recorded
- [ ] Screenshots/GIFs created
- [ ] FAQ section added
- [ ] Testimonials (if any)

### Marketing
- [ ] Product Hunt submission ready
- [ ] Twitter thread drafted
- [ ] Reddit posts prepared
- [ ] Discord announcement written
- [ ] Email to friends/beta testers sent

### Analytics & Tracking
- [ ] Vercel Analytics enabled
- [ ] Google Analytics (or Plausible) added
- [ ] Error tracking setup (Sentry optional)

---

**Once all items are checked: 🚀 LAUNCH!**

Good luck! 🦞
