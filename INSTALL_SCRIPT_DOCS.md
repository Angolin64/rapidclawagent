# Install Script Documentation

## Overview

`public/install.sh` is the core of RapidClawAgent. It's a single-command installer that deploys a fully-configured OpenClaw agent in ~60 seconds.

---

## Usage

### Basic (Interactive)
```bash
curl -sSL https://rapidclawagent.com/install.sh | bash
```

User will be prompted to:
1. Select preset (Personal/Business/Developer)
2. Enter API keys
3. Optionally configure Telegram

### With Preset Argument
```bash
curl -sSL https://rapidclawagent.com/install.sh | bash -s personal-assistant
```

Skips preset selection, goes straight to API keys.

---

## What It Does

### 1. OS Detection
- Checks for Ubuntu 24.04 LTS
- Warns if different OS but allows continuation

### 2. Dependency Installation
- curl, wget, git, build-essential
- Homebrew (Linux)
- Node.js 22 (via Homebrew)

### 3. OpenClaw Installation
```bash
npm install -g openclaw@latest
```

### 4. API Key Collection
Prompts for:
- **Anthropic API Key** (Claude)
- **Google API Key** (Gemini)
- **OpenRouter API Key** (optional)
- **Telegram Bot Token** (optional)

At least one API key is required.

### 5. Preset-Specific Config Generation

Each preset has optimized settings:

| Setting | Personal | Business | Developer |
|---------|----------|----------|-----------|
| Context Tokens | 50,000 | 75,000 | 100,000 |
| Heartbeat Freq | 1h | 30m | 2h |
| Bootstrap Max | 10k | 15k | 20k |
| Channels | TG, WA | Slack, Discord | Discord, Slack |

Generates `~/.openclaw/openclaw.json` with:
- Model configuration
- Token limits
- Heartbeat settings
- Cache strategy
- API keys (securely stored)

### 6. Workspace Initialization

Creates `~/.openclaw/workspace/`:
- **SOUL.md** - Agent personality
- **USER.md** - User preferences
- **HEARTBEAT.md** - Proactive tasks checklist
- **MEMORY.md** - Long-term memory
- **memory/YYYY-MM-DD.md** - Daily logs

### 7. Security Hardening

- Config file: `chmod 600` (owner read/write only)
- Workspace: `chmod 700` (owner access only)

### 8. Gateway Start

```bash
openclaw gateway start
```

Starts the OpenClaw daemon.

---

## Preset Details

### 🤖 Personal Assistant
```bash
CONTEXT_TOKENS=50000
HEARTBEAT_EVERY="1h"
HEARTBEAT_MODEL="google/gemini-2.5-flash"
BOOTSTRAP_MAX=10000
SKILLS="gog himalaya weather"
CHANNELS="telegram whatsapp"
```

### 💼 Business Automation
```bash
CONTEXT_TOKENS=75000
HEARTBEAT_EVERY="30m"
HEARTBEAT_MODEL="google/gemini-2.5-flash"
BOOTSTRAP_MAX=15000
SKILLS="slack discord-hub summarize deep-research"
CHANNELS="slack discord telegram"
```

### 👨‍💻 Developer Agent
```bash
CONTEXT_TOKENS=100000
HEARTBEAT_EVERY="2h"
HEARTBEAT_MODEL="google/gemini-2.5-flash"
BOOTSTRAP_MAX=20000
SKILLS="skill-creator summarize"
CHANNELS="discord slack"
```

---

## Error Handling

### No API Keys
```
❌ At least one API key is required
```
Exits if user provides no API keys.

### Unsupported OS
```
⚠️  Warning: This script is tested on Ubuntu 24.04 LTS
   Your OS: $OS $VER
Continue anyway? (y/N)
```
Allows user to proceed at their own risk.

### Gateway Start Failure
```
⚠️  Gateway start may have failed, check with: openclaw gateway status
```
Non-fatal warning if gateway doesn't start immediately.

---

## Testing Locally

```bash
# Test install script without running
bash -n ./public/install.sh

# Dry-run with preset
./scripts/test-install.sh personal-assistant

# Test interactively
bash ./public/install.sh
```

---

## Customization

### Add New Preset

1. Edit `public/install.sh`
2. Add new case in preset selection:
```bash
echo "  4) 🎨 Content Creator ($20-50/mo)"
```
3. Add config in switch statement:
```bash
"content-creator")
    CONTEXT_TOKENS=60000
    HEARTBEAT_EVERY="1h"
    SKILLS="..."
    ;;
```

### Modify Default Settings

Edit the preset-specific variables in the case statement.

### Add Post-Install Steps

Add commands after "Gateway Start" section:
```bash
# Install additional skills
npm install -g some-skill

# Run custom setup
bash ./custom-setup.sh
```

---

## Security Notes

- API keys are stored in `~/.openclaw/openclaw.json` with `600` permissions
- Workspace files are protected with `700` permissions
- **Never** commit API keys to git
- Consider using environment variables for production

---

## Future Enhancements

- [ ] Auto-detect VPS provider (Hostinger/Hetzner/DO)
- [ ] VPS-specific optimizations
- [ ] Skill auto-installation based on preset
- [ ] WhatsApp QR code linking in installer
- [ ] Post-install verification test suite
- [ ] Rollback mechanism if install fails
- [ ] Docker-based installation option
- [ ] Multi-user setup (systemd service)

---

## Troubleshooting

### Install fails at Homebrew
```bash
# Manual Homebrew install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

### Node.js not found
```bash
# Add brew to PATH
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
source ~/.bashrc
```

### Gateway won't start
```bash
# Check logs
openclaw gateway logs

# Check status
openclaw gateway status

# Manual start
openclaw gateway start --verbose
```

### Config file errors
```bash
# Validate JSON
cat ~/.openclaw/openclaw.json | jq .

# Reset config
rm ~/.openclaw/openclaw.json
# Re-run installer
```

---

## Support

- **Docs:** https://docs.openclaw.ai
- **Community:** https://discord.com/invite/clawd
- **Issues:** https://github.com/yourusername/rapidclawagent/issues
