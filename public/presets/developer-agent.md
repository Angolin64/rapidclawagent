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
