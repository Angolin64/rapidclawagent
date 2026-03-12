# 🦞 RapidClawAgent

**Deploy your AI agent in 60 seconds. Save 60-80% on costs.**

RapidClawAgent is the fastest way to deploy [OpenClaw](https://openclaw.ai) with battle-tested, cost-optimized templates. No config files, no Docker, no DevOps—just copy-paste one command.

---

## 🚀 Quick Start

```bash
curl -sSL https://rapidclawagent.com/install.sh | bash
```

That's it. Your AI agent is now running 24/7.

---

## 💰 Why RapidClawAgent?

| Without Optimization | With RapidClawAgent |
|---------------------|---------------------|
| ❌ Claude Sonnet for everything | ✅ Smart model routing |
| ❌ No token limits | ✅ Optimized context windows |
| ❌ Expensive heartbeats | ✅ Gemini Flash for background tasks |
| ❌ Manual config hell | ✅ One-command deploy |
| **$100-300/mo** | **$15-100/mo** |

### Cost Breakdown (Personal Assistant example)

| Item | Cost |
|------|------|
| VPS (Hostinger KVM2) | $6.99/mo |
| Primary model (Claude Sonnet) | ~$12-18/mo |
| Heartbeats (Gemini Flash) | ~$1-2/mo |
| Sub-agents (DeepSeek) | ~$3-5/mo |
| **Total** | **$23-32/mo** |

---

## 🎯 Presets

### 🤖 Personal Assistant ($15-35/mo)
- Email triage & responses
- Calendar management
- Daily briefings & weather
- Research assistance
- **Channels:** Telegram, WhatsApp
- **Skills:** Gmail (gog), Email (himalaya), Weather

### 💼 Business Automation ($50-100/mo)
- Customer support 24/7
- Content generation at scale
- Team notifications
- Data analysis & reporting
- **Channels:** Slack, Discord, Telegram
- **Skills:** Slack, Discord, Summarize, Deep Research

### 👨‍💻 Developer Agent ($30-70/mo)
- Code reviews
- Documentation generation
- Test automation
- CI/CD monitoring
- **Channels:** Discord, Slack
- **Skills:** GitHub, Skill Creator, Summarize

---

## 📋 Requirements

- **OS:** Ubuntu 24.04 LTS (tested on Hostinger, Hetzner, DigitalOcean)
- **RAM:** 2GB minimum
- **API Keys:** At least one of:
  - Anthropic (Claude)
  - Google (Gemini)
  - OpenRouter (DeepSeek, Minimax, etc.)

---

## ⚙️ How It Works

### 1. Preset Selection
The installer asks you to pick a template optimized for your use case.

### 2. Optimized Config
Each preset includes:
- **Smart model routing** (expensive models only when needed)
- **Context limits** (prevent runaway token costs)
- **Heartbeat optimization** (Gemini Flash for background checks)
- **Cache strategy** (short retention for cost savings)

### 3. Workspace Setup
Creates your agent's "memory":
- `SOUL.md` — Who your agent is
- `USER.md` — Who you are (preferences)
- `HEARTBEAT.md` — Proactive tasks checklist
- `MEMORY.md` — Long-term memory
- `memory/YYYY-MM-DD.md` — Daily logs

### 4. Security Hardening
- Config file permissions: `600` (owner read/write only)
- Workspace permissions: `700` (owner access only)
- Optional: Full VPS hardening available

---

## 🛠️ Post-Install

### Check Status
```bash
openclaw status
```

### Chat via CLI
```bash
openclaw chat
```

### View Logs
```bash
openclaw gateway logs
```

### Customize Your Agent
```bash
nano ~/.openclaw/workspace/SOUL.md
```

### Add More Skills
```bash
clawhub install <skill-name>
```

### Connect Telegram
1. Create bot via [@BotFather](https://t.me/BotFather)
2. Add token to `~/.openclaw/openclaw.json`:
```json
{
  "channels": {
    "telegram": {
      "token": "YOUR_BOT_TOKEN",
      "enabled": true
    }
  }
}
```
3. Restart gateway:
```bash
openclaw gateway restart
```

---

## 🔐 Security

RapidClawAgent applies **basic security** by default:
- Restrictive file permissions
- Secure API key storage
- Workspace isolation

For production deployments, run full hardening:
```bash
# Install healthcheck skill
clawhub install healthcheck

# Run VPS hardening
openclaw chat "Run security audit and apply VPS Hardened profile"
```

---

## 💡 Cost Optimization Tips

### 1. Use the Right Model for Each Task
- **Primary (expensive):** Complex reasoning, code generation
- **Heartbeat (cheap):** Background checks, simple tasks
- **Sub-agents (medium):** Batch processing, research

### 2. Limit Context Windows
Default presets use:
- Personal: 50k tokens
- Business: 75k tokens
- Developer: 100k tokens

Adjust in `~/.openclaw/openclaw.json` → `agents.defaults.contextTokens`

### 3. Optimize Heartbeats
- Personal: Every 1h (enough for most users)
- Business: Every 30m (more responsive)
- Developer: Every 2h (less frequent checks)

### 4. Monitor Usage
```bash
openclaw status
```

Look for:
- Token usage trends
- Most expensive model calls
- Heartbeat frequency impact

---

## 🆚 vs OpenClaw Launcher

| Feature | RapidClawAgent | OpenClaw Launcher |
|---------|----------------|-------------------|
| **Price** | Free (DIY) | $29+/mo managed |
| **Deploy time** | 60 seconds | 90 seconds |
| **Cost optimization** | ✅ Built-in | ❌ Manual |
| **Presets** | ✅ 3 templates | ❌ Generic config |
| **VPS control** | ✅ Full access | ❌ Managed only |
| **Customization** | ✅ Unlimited | ⚠️ Dashboard limits |
| **Open source** | ✅ MIT | ❌ Proprietary |

**When to use RapidClawAgent:**
- You want full control
- You have a VPS already
- You want to save 60-80% on costs
- You're comfortable with basic terminal commands

**When to use OpenClaw Launcher:**
- You want zero maintenance
- You prefer managed hosting
- You don't want to manage a VPS

---

## 🤝 Contributing

We welcome contributions! This project is **open source** (MIT License).

### Development Setup
```bash
git clone https://github.com/yourusername/rapidclawagent.git
cd rapidclawagent
npm install
npm run dev
```

### Roadmap
- [ ] Web dashboard for cost monitoring
- [ ] More presets (Trading, Content Creator, Support Agent)
- [ ] Auto-scaling config based on usage
- [ ] Template marketplace
- [ ] Managed hosting tier (Freemium model)

---

## 📚 Resources

- **Docs:** https://docs.openclaw.ai
- **Community:** https://discord.com/invite/clawd
- **ClawHub (Skills):** https://clawhub.com
- **Source:** https://github.com/openclaw/openclaw

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Credits

Built on [OpenClaw](https://openclaw.ai) — the most powerful open-source AI agent framework.

Inspired by the LaunchMyOpenClaw guide and optimized for real-world deployments.

---

**🦞 Deploy your AI agent today: [rapidclawagent.com](https://rapidclawagent.com)**
