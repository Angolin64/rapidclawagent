# 🤖 Personal Assistant Preset

**Estimated cost:** $15-35/month  
**Best for:** Individuals who want 24/7 AI assistance

## Features

- ✉️ **Email Management** - Triage, summarize, and draft responses
- 📅 **Calendar Integration** - Manage events, set reminders
- 🌤️ **Daily Briefings** - Weather, news, upcoming events
- 🔍 **Research Assistant** - Web search, summarize articles

## Technical Details

| Setting | Value |
|---------|-------|
| Primary Model | Claude Sonnet 4.5 |
| Heartbeat Model | Gemini Flash 2.5 |
| Sub-agent Model | DeepSeek Chat |
| Context Tokens | 50,000 |
| Heartbeat Frequency | Every 1 hour |

## Skills Included

- `gog` - Google Workspace (Gmail, Calendar, Drive)
- `himalaya` - IMAP/SMTP email client
- `weather` - Weather forecasts via wttr.in

## Channels

- Telegram
- WhatsApp

## Monthly Cost Breakdown

| Item | Cost |
|------|------|
| VPS (Hostinger KVM2) | $6.99 |
| Claude Sonnet (~30 msgs/day) | $12-18 |
| Gemini Flash (heartbeats) | $1-2 |
| DeepSeek (sub-agents) | $2-3 |
| **Total** | **$22-30/mo** |

## Deploy

```bash
curl -sSL https://rapidclawagent.com/install.sh | bash -s personal-assistant
```
