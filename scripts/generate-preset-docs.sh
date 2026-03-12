#!/bin/bash
#
# Generate preset documentation for website
# Outputs markdown files for each preset
#

cd "$(dirname "$0")/.."

PRESETS_DIR="public/presets"
mkdir -p "$PRESETS_DIR"

# Personal Assistant
cat > "$PRESETS_DIR/personal-assistant.md" << 'EOF'
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
EOF

# Business Automation
cat > "$PRESETS_DIR/business-automation.md" << 'EOF'
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
EOF

# Developer Agent
cat > "$PRESETS_DIR/developer-agent.md" << 'EOF'
# 👨‍💻 Developer Agent Preset

**Estimated cost:** $30-70/month  
**Best for:** Developers, dev teams, open-source maintainers

## Features

- 🔍 **Code Reviews** - Automated PR analysis and suggestions
- 📚 **Documentation** - Auto-generate docs from code
- 🧪 **Test Automation** - Generate unit/integration tests
- 🚀 **CI/CD Monitoring** - Track builds, deployments

## Technical Details

| Setting | Value |
|---------|-------|
| Primary Model | Claude Sonnet 4.5 |
| Heartbeat Model | Gemini Flash 2.5 |
| Sub-agent Model | DeepSeek Chat |
| Context Tokens | 100,000 |
| Heartbeat Frequency | Every 2 hours |

## Skills Included

- `skill-creator` - Create/edit OpenClaw skills
- `summarize` - Summarize docs, issues, PRs
- GitHub integration (via `gh` CLI)

## Channels

- Discord
- Slack

## Monthly Cost Breakdown

| Item | Cost |
|------|------|
| VPS (Hostinger KVM2) | $6.99 |
| Claude Sonnet (~50 msgs/day) | $18-35 |
| Gemini Flash (heartbeats) | $1-2 |
| DeepSeek (sub-agents) | $4-8 |
| **Total** | **$30-52/mo** |

## Deploy

```bash
curl -sSL https://rapidclawagent.com/install.sh | bash -s developer-agent
```
EOF

echo "✅ Generated preset documentation in $PRESETS_DIR/"
ls -lh "$PRESETS_DIR/"
