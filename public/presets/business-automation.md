# 💼 Business Automation Preset

**Estimated cost:** $50-100/month  
**Best for:** Businesses, agencies, teams

## Features

- 🎧 **Customer Support** - 24/7 automated responses
- 📝 **Content Generation** - Blog posts, social media, newsletters
- 🔔 **Team Notifications** - Slack/Discord integrations
- 📊 **Data Analysis** - Reports, insights, summaries

## Technical Details

| Setting | Value |
|---------|-------|
| Primary Model | GPT-5.2 |
| Heartbeat Model | Gemini Flash 2.5 |
| Sub-agent Model | Minimax Text-01 |
| Context Tokens | 75,000 |
| Heartbeat Frequency | Every 30 minutes |

## Skills Included

- `slack` - Slack integration
- `discord-hub` - Discord bot API
- `summarize` - Web/PDF/video summarization
- `deep-research` - Gemini Interactions API research

## Channels

- Slack
- Discord
- Telegram

## Monthly Cost Breakdown

| Item | Cost |
|------|------|
| VPS (Hostinger KVM4) | $14.99 |
| GPT-5.2 (~80 msgs/day) | $40-60 |
| Gemini Flash (heartbeats) | $2-4 |
| Minimax (sub-agents) | $5-10 |
| **Total** | **$62-89/mo** |

## Deploy

```bash
curl -sSL https://rapidclawagent.com/install.sh | bash -s business-automation
```
