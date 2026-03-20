# RapidClawAgent — GHL Dashboard Setup Guide

> Everything you can't do via API. Copy-paste ready. ~15 min total.

---

## 1. PIPELINE (3 min)

Go to: **CRM → Pipelines → + New Pipeline**

Name: `RapidClawAgent Users`

Stages (in order):
1. Lead Captured
2. Install Started
3. Install Complete
4. Active User
5. Pro Upgrade

---

## 2. EMAIL SEQUENCES (8 min)

Go to: **Automation → Workflows → + New Workflow → Start from Scratch**

### Workflow Name: `RCA - Onboarding Sequence`

**Trigger:** Contact Tag Added → tag = `lead`

---

### Email 1 — Welcome (Send immediately)

**Subject:** `🦞 Welcome to RapidClawAgent — your install guide is here`

**Body:**

```
Hey {{contact.first_name}} 👋,

Thanks for joining RapidClawAgent. You're one command away from having your own AI agent running 24/7.

Here's your install command — run it on your VPS:

  curl -sSL https://rapidclawagent.com/install.sh | bash

It takes about 60 seconds. The installer will walk you through everything.

📖 Need a step-by-step walkthrough? Read the Beginner's Guide:
   https://rapidclawagent.com/guia

🆘 Stuck? Visit: https://rapidclawagent.com/help

Talk soon,
Angel
RapidClawAgent
```

---

### Email 2 — Day 3 check-in (Wait 3 days)

**Subject:** `Quick check-in — did your agent deploy ok?`

**Body:**

```
Hey {{contact.first_name}},

Just checking in — did everything go smoothly with the install?

If you hit any issues, here are the most common fixes:

1. Permission denied → run: sudo bash install.sh
2. curl not found → run: sudo apt install curl
3. Agent not responding → run: openclaw gateway status

Still stuck? Reply to this email and I'll help directly.

If everything's working — awesome! Here are 3 things to try:
- Chat with your agent: openclaw chat
- Check status: openclaw status
- Connect Telegram: just add your bot token to the config

Cheers,
Angel
```

---

### Email 3 — Day 7 tips (Wait 7 days from start)

**Subject:** `Get more out of your AI agent — 3 quick tips`

**Body:**

```
Hey {{contact.first_name}},

A week in — nice! Here are 3 things that'll level up your agent:

1. 🧠 Edit your SOUL.md
   This is your agent's personality. Change the name, vibe, and what it knows about you.
   File: ~/.openclaw/workspace/SOUL.md

2. 📅 Set up a heartbeat
   Your agent can check in on you daily — email, calendar, tasks.
   Edit: ~/.openclaw/workspace/HEARTBEAT.md

3. 💬 Connect Telegram
   Chat with your agent from your phone.
   Guide: https://rapidclawagent.com/guia#telegram

Any questions? Just reply.

Angel
```

---

### Email 4 — Day 14 feedback (Wait 14 days from start)

**Subject:** `Quick question about your experience`

**Body:**

```
Hey {{contact.first_name}},

Two weeks with RapidClawAgent — how's it going?

I'd love to hear:
- What's working great?
- What's confusing or broken?
- What feature would make the biggest difference?

Just reply to this email. I read every one.

Also — if you want priority support, access to Pro presets, and a private channel to request features, we're launching a Pro tier soon. Reply "Pro" and I'll put you on the early access list.

Angel
```

---

## 3. AI WEBCHAT BOT (4 min)

Go to: **Settings → Conversation AI → + New Bot**

### Bot Name: `RapidClaw Support`

### Bot Personality / System Prompt:

```
You are RapidClaw, the support assistant for RapidClawAgent — a one-command installer that deploys AI agents (OpenClaw) to any Ubuntu VPS in 60 seconds.

Your job: help users install, configure, and troubleshoot their AI agent.

TONE: Friendly, technical, concise. No fluff. Use emojis sparingly (🦞 is the brand mascot).

COMMON QUESTIONS & ANSWERS:

Q: What is RapidClawAgent?
A: RapidClawAgent is a one-command installer for OpenClaw, an open-source AI agent framework. Run one command on your VPS and you have a personal AI assistant running 24/7 — connected to Telegram, with a heartbeat system and cost-optimized model routing.

Q: What do I need to install it?
A: A VPS running Ubuntu 22.04 or 24.04 LTS, at least 1GB RAM, and an API key from Anthropic (Claude) or Google (Gemini). Recommended VPS: Hostinger KVM2 (~$4-8/mo).

Q: How do I install it?
A: Run this command on your VPS:
curl -sSL https://rapidclawagent.com/install.sh | bash
The installer will walk you through the rest.

Q: I get "Permission denied"
A: Run with sudo: sudo bash -c "curl -sSL https://rapidclawagent.com/install.sh | bash"

Q: curl not found
A: Run: sudo apt update && sudo apt install curl -y

Q: My agent isn't responding
A: Check if the gateway is running: openclaw gateway status
To restart it: openclaw gateway restart

Q: How do I connect Telegram?
A: Create a bot via @BotFather on Telegram, copy the token, and add it when the installer asks. Or edit ~/.openclaw/openclaw.json and add your token under channels.telegram.

Q: How much does it cost?
A: The installer is free. You pay only for API usage (~$15-100/month depending on usage). We recommend Claude Sonnet or Gemini Flash for the best cost/performance ratio.

Q: Where is the beginner guide?
A: https://rapidclawagent.com/guia

Q: How do I get a VPS?
A: We recommend Hostinger. Use this link for a discount: https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB

If you can't answer a question, say: "I'm not sure about that one — email us at hello@rapidclawagent.com and Angel will help directly."

LEAD CAPTURE: If the user hasn't installed yet, ask for their email so you can send them the install guide.
```

### Bot Settings:
- **Auto-reply in conversations**: ✅ ON
- **Channels**: Web Chat
- **Auto-assign conversation**: OFF (or assign to yourself)

### After creating the bot — add Web Chat widget to the site:

Go to: **Settings → Chat Widget → Get Code**

Copy the script snippet. I'll add it to the Next.js layout automatically — just paste it here or send it to me.

---

## 4. CONTACT WORKFLOW AUTOMATION

Go to: **Automation → Workflows → + New Workflow**

### Workflow Name: `RCA - Tag Install Complete → Move Pipeline`

**Trigger:** Contact Tag Added → tag = `install-complete`

**Action 1:** Move to Pipeline
- Pipeline: RapidClawAgent Users
- Stage: Install Complete

**Action 2:** Add Tag: `active-user`

---

## DONE ✅

Once these are live:
- Every web form lead → GHL contact + onboarding sequence fires
- Every successful install.sh → contact updated, moved to "Install Complete" stage
- Webchat bot handles support 24/7
- You can see the full user journey in the pipeline

---

*Note: Chat widget code — send it to me and I'll embed it in the Next.js layout in 2 minutes.*
