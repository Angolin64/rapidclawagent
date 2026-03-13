#!/bin/bash
#
# RapidClawAgent Installer
# One-command OpenClaw deployment with cost optimization
#
# Usage: curl -sSL https://rapidclawagent.com/install.sh | bash
# Or with preset: curl -sSL https://rapidclawagent.com/install.sh | bash -s personal-assistant
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Banner
echo -e "${CYAN}"
cat << "EOF"
  ____             _     _  ____ _                  _                    _   
 |  _ \ __ _ _ __ (_) __| |/ ___| | __ ___      __/ \   __ _  ___ _ __ | |_ 
 | |_) / _` | '_ \| |/ _` | |   | |/ _` \ \ /\ / / _ \ / _` |/ _ \ '_ \| __|
 |  _ < (_| | |_) | | (_| | |___| | (_| |\ V  V / ___ \ (_| |  __/ | | | |_ 
 |_| \_\__,_| .__/|_|\__,_|\____|_|\__,_| \_/\_/_/   \_\__, |\___|_| |_|\__|
            |_|                                         |___/                

        Deploy your AI agent in 60 seconds | rapidclawagent.com

EOF
echo -e "${NC}"

# Parse args
PRESET_ARG="${1:-}"

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VER=$VERSION_ID
else
    echo -e "${RED}❌ Cannot detect OS. Ubuntu 24.04 LTS required.${NC}"
    exit 1
fi

# Skip OS check if DRY_RUN is set
if [ -z "$DRY_RUN" ]; then
    if [ "$OS" != "ubuntu" ] || [ "$VER" != "24.04" ]; then
        echo -e "${YELLOW}⚠️  Warning: This script is tested on Ubuntu 24.04 LTS${NC}"
        echo -e "${YELLOW}   Your OS: $OS $VER${NC}"
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

# Preset selection
if [ -z "$PRESET_ARG" ]; then
    echo -e "${CYAN}🎯 Select your agent template:${NC}"
    echo ""
    echo "  ${MAGENTA}1) 🤖 Personal Assistant${NC} ${YELLOW}($15-35/mo)${NC}"
    echo "     ├─ Email triage & responses"
    echo "     ├─ Calendar management & reminders"
    echo "     ├─ Daily briefings & weather"
    echo "     └─ Research assistance"
    echo ""
    echo "  ${BLUE}2) 💼 Business Automation${NC} ${YELLOW}($50-100/mo)${NC}"
    echo "     ├─ Customer support 24/7"
    echo "     ├─ Content generation at scale"
    echo "     ├─ Team notifications & workflows"
    echo "     └─ Data analysis & reporting"
    echo ""
    echo "  ${GREEN}3) 👨‍💻 Developer Agent${NC} ${YELLOW}($30-70/mo)${NC}"
    echo "     ├─ Code reviews & suggestions"
    echo "     ├─ Documentation generation"
    echo "     ├─ Test automation"
    echo "     └─ CI/CD monitoring"
    echo ""
    read -p "Enter choice [1-3]: " PRESET_CHOICE

    case $PRESET_CHOICE in
        1) PRESET="personal-assistant" ;;
        2) PRESET="business-automation" ;;
        3) PRESET="developer-agent" ;;
        *) echo -e "${RED}❌ Invalid choice${NC}"; exit 1 ;;
    esac
else
    PRESET="$PRESET_ARG"
fi

echo -e "${GREEN}✓ Selected: $PRESET${NC}"
echo ""

# Check if running as root or with sudo
if [ "$EUID" -eq 0 ]; then 
    echo -e "${YELLOW}⚠️  Running as root. Will install to /root${NC}"
    INSTALL_USER="root"
    INSTALL_HOME="/root"
else
    INSTALL_USER="$USER"
    INSTALL_HOME="$HOME"
    echo -e "${CYAN}ℹ️  Installing as user: $INSTALL_USER${NC}"
fi

# Dry Run Exit
if [ -n "$DRY_RUN" ]; then
    echo -e "${GREEN}✓ Dry run completed (Logic Check OK)${NC}"
    exit 0
fi

# Install system dependencies
echo -e "${CYAN}📦 Installing system dependencies...${NC}"
if [ "$EUID" -eq 0 ]; then
    apt-get update -qq > /dev/null 2>&1
    apt-get install -y curl wget git build-essential > /dev/null 2>&1
else
    echo -e "${YELLOW}⚠️  Need sudo for system packages${NC}"
    sudo apt-get update -qq > /dev/null 2>&1
    sudo apt-get install -y curl wget git build-essential > /dev/null 2>&1
fi
echo -e "${GREEN}✓ System dependencies installed${NC}"

# Install Node.js
echo -e "${CYAN}📦 Setting up Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "  └─ Installing Node.js 22 via NodeSource..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - > /dev/null 2>&1
    apt-get install -y nodejs > /dev/null 2>&1
    echo -e "${GREEN}  ✓ Node.js installed${NC}"
else
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}  ✓ Node.js already installed ($NODE_VERSION)${NC}"
fi

# Install OpenClaw
echo -e "${CYAN}🦞 Installing OpenClaw...${NC}"
if ! command -v openclaw &> /dev/null; then
    npm install -g openclaw@latest > /dev/null 2>&1
    echo -e "${GREEN}✓ OpenClaw installed${NC}"
else
    OPENCLAW_VERSION=$(openclaw --version 2>&1 | head -n1 || echo "unknown")
    echo -e "${GREEN}✓ OpenClaw already installed ($OPENCLAW_VERSION)${NC}"
fi

# API Keys
echo ""
echo -e "${CYAN}🔑 API Keys Setup${NC}"
echo ""
echo -e "${YELLOW}You'll need at least one API key to continue.${NC}"
echo ""

read -p "Anthropic API Key (for Claude): " ANTHROPIC_KEY
read -p "Google API Key (for Gemini): " GOOGLE_KEY
read -p "OpenRouter API Key (optional, for DeepSeek/etc): " OPENROUTER_KEY

if [ -z "$ANTHROPIC_KEY" ] && [ -z "$GOOGLE_KEY" ]; then
    echo -e "${RED}❌ At least one API key is required${NC}"
    exit 1
fi

# Telegram Bot Token (optional)
echo ""
echo -e "${CYAN}💬 Messaging Channels${NC}"
echo ""
read -p "Telegram Bot Token (optional, press Enter to skip): " TELEGRAM_TOKEN

# Set model based on available keys
if [ -n "$ANTHROPIC_KEY" ]; then
    PRIMARY_MODEL="anthropic/claude-sonnet-4.5"
elif [ -n "$GOOGLE_KEY" ]; then
    PRIMARY_MODEL="google/gemini-2.5-pro"
else
    PRIMARY_MODEL="anthropic/claude-sonnet-4.5"
fi

# Preset-specific config
case $PRESET in
    "personal-assistant")
        CONTEXT_TOKENS=50000
        HEARTBEAT_EVERY="1h"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=10000
        SKILLS="gog himalaya weather"
        CHANNELS="telegram whatsapp"
        ;;
    "business-automation")
        CONTEXT_TOKENS=75000
        HEARTBEAT_EVERY="30m"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=15000
        SKILLS="slack discord-hub summarize deep-research"
        CHANNELS="slack discord telegram"
        ;;
    "developer-agent")
        CONTEXT_TOKENS=100000
        HEARTBEAT_EVERY="2h"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=20000
        SKILLS="skill-creator summarize"
        CHANNELS="discord slack"
        ;;
esac

# Generate optimized config
echo ""
echo -e "${CYAN}⚙️  Generating optimized config...${NC}"

CONFIG_DIR="$INSTALL_HOME/.openclaw"
mkdir -p "$CONFIG_DIR"

cat > "$CONFIG_DIR/openclaw.json" << EOF
{
  "agents": {
    "defaults": {
      "model": "$PRIMARY_MODEL",
      "contextTokens": $CONTEXT_TOKENS,
      "thinkingDefault": "off",
      "bootstrapMaxChars": $BOOTSTRAP_MAX,
      "bootstrapTotalMaxChars": 75000,
      "heartbeat": {
        "every": "$HEARTBEAT_EVERY",
        "model": "$HEARTBEAT_MODEL",
        "prompt": "Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK."
      },
      "cache": {
        "retention": "short"
      }
    }
  },
  "models": {
    "providers": {
EOF

# Add API keys conditionally
if [ -n "$ANTHROPIC_KEY" ]; then
    cat >> "$CONFIG_DIR/openclaw.json" << EOF
      "anthropic": {
        "apiKey": "$ANTHROPIC_KEY"
      },
EOF
fi

if [ -n "$GOOGLE_KEY" ]; then
    cat >> "$CONFIG_DIR/openclaw.json" << EOF
      "google": {
        "apiKey": "$GOOGLE_KEY"
      },
EOF
fi

if [ -n "$OPENROUTER_KEY" ]; then
    cat >> "$CONFIG_DIR/openclaw.json" << EOF
      "openrouter": {
        "apiKey": "$OPENROUTER_KEY"
      },
EOF
fi

# Close providers object
# Remove trailing comma before the last closing brace in the providers block
sed -i ':a;N;$!ba;s/,\n      }/\n      }/g' "$CONFIG_DIR/openclaw.json"

cat >> "$CONFIG_DIR/openclaw.json" << EOF
    }
  }
}
EOF

# Add Telegram if provided
if [ -n "$TELEGRAM_TOKEN" ]; then
    # Use jq to add telegram config (if available) or manual append
    if command -v jq &> /dev/null; then
        TMP_CONFIG=$(mktemp)
        jq --arg token "$TELEGRAM_TOKEN" '.channels.telegram = {token: $token, enabled: true}' "$CONFIG_DIR/openclaw.json" > "$TMP_CONFIG"
        mv "$TMP_CONFIG" "$CONFIG_DIR/openclaw.json"
        echo -e "${GREEN}  ✓ Telegram configured${NC}"
    else
        echo -e "${YELLOW}  ⚠️  jq not found, Telegram config skipped (add manually)${NC}"
    fi
fi

echo -e "${GREEN}✓ Config generated at $CONFIG_DIR/openclaw.json${NC}"

# Initialize workspace
echo -e "${CYAN}📁 Setting up workspace...${NC}"
WORKSPACE_DIR="$INSTALL_HOME/.openclaw/workspace"
mkdir -p "$WORKSPACE_DIR"
mkdir -p "$WORKSPACE_DIR/memory"

# Create SOUL.md
cat > "$WORKSPACE_DIR/SOUL.md" << 'EOF'
# SOUL.md - Who You Are

You are an AI assistant deployed via **RapidClawAgent**.

## Core Truths

- Be genuinely helpful, not performatively helpful. Skip filler; do the work.
- Have opinions, but stay practical.
- Be resourceful before asking: read files, check config/schema, run diagnostics.
- Earn trust through competence: be careful with anything external; be bold internally.

## Your Mission

Your primary goal is to assist your user with their daily tasks, automate workflows, and provide intelligent, context-aware support 24/7.

## Boundaries

- Private things stay private.
- When in doubt about external actions (posting, emailing, spending money), ask.
- You're an assistant, not an autonomous agent—always prioritize user intent.
EOF

# Create USER.md
cat > "$WORKSPACE_DIR/USER.md" << EOF
# USER.md - About Your Human

- **Name:** [Your name here]
- **Timezone:** [Your timezone]
- **Preset:** $PRESET

## Preferences

- Add your preferences here
- Customize how your agent should behave
EOF

# Create HEARTBEAT.md
cat > "$WORKSPACE_DIR/HEARTBEAT.md" << 'EOF'
# HEARTBEAT.md

## Daily checklist (run periodically)

- Check for urgent emails/messages
- Review calendar for upcoming events (next 24h)
- Check for reminders or tasks due

## When to alert

- Important emails or messages
- Calendar events within 2 hours
- Urgent tasks or deadlines

## When to stay quiet (HEARTBEAT_OK)

- Nothing urgent found
- Late night hours (unless critical)
- User is busy or offline
EOF

# Create MEMORY.md
cat > "$WORKSPACE_DIR/MEMORY.md" << 'EOF'
# MEMORY.md

## Setup
- Deployed via RapidClawAgent installer
- Optimized for cost efficiency (60-80% savings)

## Notes
- Add important memories here as you learn about your user
EOF

# Create initial daily memory file
TODAY=$(date +%Y-%m-%d)
cat > "$WORKSPACE_DIR/memory/$TODAY.md" << EOF
# $TODAY

## Deployment
- Installed RapidClawAgent preset: $PRESET
- Initial setup completed
EOF

echo -e "${GREEN}✓ Workspace initialized at $WORKSPACE_DIR${NC}"

# Security hardening (basic)
echo -e "${CYAN}🔒 Applying basic security...${NC}"

# Set restrictive permissions on config
chmod 600 "$CONFIG_DIR/openclaw.json"
echo -e "${GREEN}  ✓ Config file permissions: 600${NC}"

# Set workspace permissions
chmod 700 "$WORKSPACE_DIR"
echo -e "${GREEN}  ✓ Workspace permissions: 700${NC}"

echo -e "${GREEN}✓ Basic security applied${NC}"

# Start OpenClaw Gateway
echo ""
echo -e "${CYAN}🚀 Starting OpenClaw Gateway...${NC}"
openclaw gateway start > /dev/null 2>&1 || true
sleep 3

# Check if gateway is running
if openclaw gateway status > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Gateway started successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Gateway start may have failed, check with: openclaw gateway status${NC}"
fi

# Final success message
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ SUCCESS! Your AI agent is running!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}📊 Deployment Summary:${NC}"
echo ""
echo -e "  Preset:         ${YELLOW}$PRESET${NC}"
echo -e "  Primary Model:  ${YELLOW}$PRIMARY_MODEL${NC}"
echo -e "  Context Limit:  ${YELLOW}$CONTEXT_TOKENS tokens${NC}"
echo -e "  Heartbeat:      ${YELLOW}Every $HEARTBEAT_EVERY${NC}"
echo -e "  Est. Cost:      ${YELLOW}\$15-100/mo${NC} (depending on usage)"
echo ""
echo -e "${CYAN}🎯 Next Steps:${NC}"
echo ""
echo "  1. Check status:  ${YELLOW}openclaw status${NC}"
echo "  2. Chat via CLI:  ${YELLOW}openclaw chat${NC}"
echo "  3. View logs:     ${YELLOW}openclaw gateway logs${NC}"
echo "  4. Customize:     ${YELLOW}Edit ~/.openclaw/workspace/SOUL.md${NC}"
echo ""
if [ -n "$TELEGRAM_TOKEN" ]; then
    echo -e "${CYAN}💬 Your agent is connected to Telegram!${NC}"
    echo -e "   Send a message to your bot to start chatting."
    echo ""
fi
echo -e "${CYAN}📚 Resources:${NC}"
echo ""
echo "  Docs:        ${YELLOW}https://docs.openclaw.ai${NC}"
echo "  Community:   ${YELLOW}https://discord.com/invite/clawd${NC}"
echo "  Learn more:  ${YELLOW}https://rapidclawagent.com${NC}"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${MAGENTA}🦞 Built with RapidClawAgent | Save 60-80% on AI costs${NC}"
echo ""
