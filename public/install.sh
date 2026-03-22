#!/bin/bash
#
# RapidClawAgent Installer
# One-command OpenClaw deployment with cost optimization
#
# Usage: curl -sSL https://rapidclawagent.com/install.sh | bash
# Or with preset: curl -sSL https://rapidclawagent.com/install.sh | bash -s personal-assistant
#

# ── Safety: NO set -e (we handle errors manually with clear messages) ──────────
set -u  # undefined variables = error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# ── Helpers ────────────────────────────────────────────────────────────────────
die() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    echo -e "${YELLOW}   If you need help, visit: https://rapidclawagent.com/guia${NC}"
    exit 1
}

ok() { echo -e "${GREEN}  ✓ $1${NC}"; }
info() { echo -e "${CYAN}▶ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }

run_cmd() {
    # Run a command, die with a clear message if it fails
    local description="$1"; shift
    if ! "$@" > /tmp/rca_cmd.log 2>&1; then
        echo -e "${RED}❌ Failed: $description${NC}"
        echo -e "${YELLOW}   Error output:${NC}"
        tail -5 /tmp/rca_cmd.log | sed 's/^/   /'
        die "Could not complete: $description"
    fi
}

# ── Banner ─────────────────────────────────────────────────────────────────────
echo -e "${CYAN}"
cat << "EOF"
  ____             _     _  ____ _                  _                    _   
 |  _ \ __ _ _ __ (_) __| |/ ___| | __ ___      __/ \   __ _  ___ _ __ | |_ 
 | |_) / _` | '_ \| |/ _` | |   | |/ _` \ \ /\ / / _ \ / _` |/ _ \ '_ \| __|
 |  _ < (_| | |_) | | (_| | |___| | (_| |\ V  V / ___ \ (_| |  __/ | | | |_ 
 |_| \_\__,_| .__/|_|\__,_|\____|_|\__,_| \_/\_/_/   \_\__, |\___|_| |_|\__|
            |_|                                         |___/                

        Your AI Agent — Running 24/7 | rapidclawagent.com

EOF
echo -e "${NC}"

# ── Parse args ─────────────────────────────────────────────────────────────────
PRESET_ARG="${1:-}"

# ── OS Check ───────────────────────────────────────────────────────────────────
if [ ! -f /etc/os-release ]; then
    die "Cannot detect OS. Ubuntu 24.04 LTS is required."
fi

. /etc/os-release
OS="${ID:-unknown}"
VER="${VERSION_ID:-unknown}"

if [ "$OS" != "ubuntu" ] || [ "$VER" != "24.04" ]; then
    warn "This script is tested on Ubuntu 24.04 LTS"
    warn "Your OS: $OS $VER"
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r REPLY_OS </dev/tty
    echo
    if [[ ! "${REPLY_OS:-}" =~ ^[Yy]$ ]]; then
        echo "Aborted. Get a fresh Ubuntu 24.04 VPS at: https://www.hostinger.com?REFERRALCODE=SVYAGOLINZTB"
        exit 0
    fi
fi

# ── Root detection ─────────────────────────────────────────────────────────────
if [ "${EUID:-$(id -u)}" -eq 0 ]; then
    SUDO=""
    INSTALL_HOME="/root"
    warn "Running as root — installing to /root"
else
    SUDO="sudo"
    INSTALL_HOME="$HOME"
    info "Installing as user: ${USER:-$(whoami)}"
fi

# ── Preset selection ───────────────────────────────────────────────────────────
if [ -z "$PRESET_ARG" ]; then
    echo ""
    echo "=========================================="
    echo "  Select your agent template:"
    echo "=========================================="
    echo ""
    echo "  1) Personal Assistant  (\$15-35/mo)"
    echo "     - Email triage & responses"
    echo "     - Calendar management & reminders"
    echo "     - Daily briefings"
    echo ""
    echo "  2) Business Automation  (\$50-100/mo)"
    echo "     - Customer support 24/7"
    echo "     - Content generation"
    echo "     - Team notifications"
    echo ""
    echo "  3) Developer Agent  (\$30-70/mo)"
    echo "     - Code reviews"
    echo "     - Documentation generation"
    echo "     - CI/CD monitoring"
    echo ""
    echo "=========================================="
    echo ""

    # Read from /dev/tty so it works when piped via curl | bash
    read -p "Enter choice [1-3]: " PRESET_CHOICE </dev/tty

    case "${PRESET_CHOICE:-}" in
        1) PRESET="personal-assistant" ;;
        2) PRESET="business-automation" ;;
        3) PRESET="developer-agent" ;;
        *) die "Invalid choice. Run the script again and enter 1, 2, or 3." ;;
    esac
else
    PRESET="$PRESET_ARG"
fi

ok "Selected preset: $PRESET"
echo ""

# ── System dependencies ────────────────────────────────────────────────────────
info "Installing system dependencies..."
$SUDO apt-get update -qq > /dev/null 2>&1 || warn "apt-get update had warnings (continuing...)"
run_cmd "Install curl, wget, git, build-essential" \
    $SUDO apt-get install -y curl wget git build-essential python3

ok "System dependencies ready"

# ── Node.js ────────────────────────────────────────────────────────────────────
info "Setting up Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version 2>/dev/null || echo "unknown")
    ok "Node.js already installed ($NODE_VERSION)"
else
    info "Installing Node.js 22 via NodeSource..."
    # Download setup script to a temp file first (safer than piping directly)
    if ! curl -fsSL https://deb.nodesource.com/setup_22.x -o /tmp/nodesource_setup.sh; then
        die "Could not download NodeSource setup. Check your internet connection."
    fi
    run_cmd "Run NodeSource setup" bash /tmp/nodesource_setup.sh
    run_cmd "Install nodejs package" $SUDO apt-get install -y nodejs
    rm -f /tmp/nodesource_setup.sh
    NODE_VERSION=$(node --version 2>/dev/null || echo "installed")
    ok "Node.js $NODE_VERSION installed"
fi

# Verify node actually works
if ! node -e "console.log('ok')" > /dev/null 2>&1; then
    die "Node.js installed but not working. Try: sudo apt-get install -y nodejs"
fi

# ── OpenClaw ───────────────────────────────────────────────────────────────────
info "Installing OpenClaw..."
if command -v openclaw &> /dev/null; then
    OPENCLAW_VERSION=$(openclaw --version 2>&1 | head -n1 || echo "unknown")
    ok "OpenClaw already installed ($OPENCLAW_VERSION)"
else
    # Clean up any partial/broken install first
    NPM_PREFIX=$(npm config get prefix 2>/dev/null || echo "/usr")
    if [ -d "$NPM_PREFIX/lib/node_modules/openclaw" ]; then
        warn "Removing previous partial OpenClaw install..."
        rm -rf "$NPM_PREFIX/lib/node_modules/openclaw" 2>/dev/null || true
    fi

    # npm install as root needs --unsafe-perm
    if [ -z "$SUDO" ]; then
        run_cmd "Install OpenClaw globally" npm install -g openclaw@latest --unsafe-perm
    else
        run_cmd "Install OpenClaw globally" $SUDO npm install -g openclaw@latest
    fi

    # Verify
    if ! command -v openclaw &> /dev/null; then
        # Try to find it and add to PATH
        NPM_BIN=$(npm bin -g 2>/dev/null || echo "")
        if [ -n "$NPM_BIN" ] && [ -f "$NPM_BIN/openclaw" ]; then
            export PATH="$NPM_BIN:$PATH"
            ok "OpenClaw installed (added $NPM_BIN to PATH)"
        else
            die "OpenClaw installed but 'openclaw' command not found. Try: export PATH=\$(npm bin -g):\$PATH"
        fi
    else
        ok "OpenClaw installed"
    fi
fi

# ── API Keys ───────────────────────────────────────────────────────────────────
echo ""
info "API Keys Setup"
echo ""
echo "You need at least ONE API key to continue."
echo ""
echo "  RECOMMENDED (free, no credit card):"
echo "  Google Gemini key -> https://aistudio.google.com/apikey"
echo ""
echo "  OTHER OPTIONS:"
echo "  Anthropic (Claude) -> https://console.anthropic.com"
echo "  OpenRouter (Llama, DeepSeek, etc.) -> https://openrouter.ai/keys"
echo ""

read -p "Google API Key (Gemini) [RECOMMENDED, free]: " GOOGLE_KEY </dev/tty
read -p "Anthropic API Key (Claude) — press Enter to skip: " ANTHROPIC_KEY </dev/tty
read -p "OpenRouter API Key — press Enter to skip: " OPENROUTER_KEY </dev/tty

if [ -z "${ANTHROPIC_KEY:-}" ] && [ -z "${GOOGLE_KEY:-}" ] && [ -z "${OPENROUTER_KEY:-}" ]; then
    die "At least one API key is required. Get a free Google key at: https://aistudio.google.com/apikey"
fi

# ── Email (required for support) & Telegram ───────────────────────────────────
echo ""
info "Account Setup"
echo ""
echo "Your email is required to:"
echo "  - Send you the setup guide"
echo "  - Provide support if something goes wrong"
echo "  - Notify you of important updates"
echo ""

USER_EMAIL=""
while [ -z "${USER_EMAIL:-}" ]; do
    read -p "Your email address: " USER_EMAIL </dev/tty
    if [ -z "${USER_EMAIL:-}" ]; then
        echo "  Email is required. Please enter your email address."
    fi
done

echo ""
read -p "Telegram Bot Token (optional — press Enter to skip): " TELEGRAM_TOKEN </dev/tty

# ── Model & preset config ──────────────────────────────────────────────────────
if [ -n "${GOOGLE_KEY:-}" ]; then
    PRIMARY_MODEL="google/gemini-2.5-flash"
elif [ -n "${ANTHROPIC_KEY:-}" ]; then
    PRIMARY_MODEL="anthropic/claude-sonnet-4-5"
else
    PRIMARY_MODEL="openrouter/deepseek/deepseek-chat"
fi

case $PRESET in
    "personal-assistant")
        CONTEXT_TOKENS=50000
        HEARTBEAT_EVERY="1h"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=10000
        ;;
    "business-automation")
        CONTEXT_TOKENS=75000
        HEARTBEAT_EVERY="30m"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=15000
        ;;
    "developer-agent")
        CONTEXT_TOKENS=100000
        HEARTBEAT_EVERY="2h"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=20000
        ;;
    *)
        CONTEXT_TOKENS=50000
        HEARTBEAT_EVERY="1h"
        HEARTBEAT_MODEL="google/gemini-2.5-flash"
        BOOTSTRAP_MAX=10000
        ;;
esac

# ── Generate config (Python — guaranteed valid JSON) ───────────────────────────
info "Generating optimized config..."

CONFIG_DIR="$INSTALL_HOME/.openclaw"
mkdir -p "$CONFIG_DIR"

export ANTHROPIC_KEY="${ANTHROPIC_KEY:-}"
export GOOGLE_KEY="${GOOGLE_KEY:-}"
export OPENROUTER_KEY="${OPENROUTER_KEY:-}"
export TELEGRAM_TOKEN="${TELEGRAM_TOKEN:-}"
export PRIMARY_MODEL CONTEXT_TOKENS BOOTSTRAP_MAX HEARTBEAT_EVERY HEARTBEAT_MODEL CONFIG_DIR

python3 - << 'PYEOF'
import json, os

def env(key, default=""):
    return os.environ.get(key, default)

config = {
    "agents": {
        "defaults": {
            "model": env("PRIMARY_MODEL"),
            "contextTokens": int(env("CONTEXT_TOKENS", "50000")),
            "heartbeat": {
                "every": env("HEARTBEAT_EVERY", "1h"),
                "model": env("HEARTBEAT_MODEL", "google/gemini-2.5-flash"),
                "prompt": "Read HEARTBEAT.md if it exists (workspace context). Follow it strictly. Do not infer or repeat old tasks from prior chats. If nothing needs attention, reply HEARTBEAT_OK."
            }
        }
    },
    "models": {"providers": {}}
}

for provider, env_var in [("google", "GOOGLE_KEY"), ("anthropic", "ANTHROPIC_KEY"), ("openrouter", "OPENROUTER_KEY")]:
    val = env(env_var)
    if val and len(val) > 8:
        config["models"]["providers"][provider] = {"apiKey": val}

telegram = env("TELEGRAM_TOKEN")
if telegram and len(telegram) > 8:
    config["channels"] = {
        "telegram": {"token": telegram, "enabled": True}
    }

config_path = os.path.join(env("CONFIG_DIR"), "openclaw.json")
with open(config_path, "w") as f:
    json.dump(config, f, indent=2)

print(f"Config written to: {config_path}")
PYEOF

if [ $? -ne 0 ]; then
    die "Config generation failed. Make sure python3 is installed: sudo apt-get install -y python3"
fi

chmod 600 "$CONFIG_DIR/openclaw.json"
ok "Config generated and secured (chmod 600)"

# ── Workspace ──────────────────────────────────────────────────────────────────
info "Setting up workspace..."
WORKSPACE_DIR="$CONFIG_DIR/workspace"
mkdir -p "$WORKSPACE_DIR/memory"
chmod 700 "$WORKSPACE_DIR"

cat > "$WORKSPACE_DIR/SOUL.md" << 'SOULEOF'
# SOUL.md - Who You Are

You are an AI assistant deployed via **RapidClawAgent**.

## Core Truths

- Be genuinely helpful, not performatively helpful. Skip filler; do the work.
- Have opinions, but stay practical.
- Be resourceful before asking: read files, check config/schema, run diagnostics.
- Earn trust through competence.

## Boundaries

- Private things stay private.
- When in doubt about external actions (posting, emailing, spending money), ask.
SOULEOF

cat > "$WORKSPACE_DIR/USER.md" << USEREOF
# USER.md - About Your Human

- **Name:** [Edit this — your name]
- **Timezone:** [Edit this — your timezone, e.g. America/New_York]
- **Preset:** $PRESET

## Preferences

- Add your communication preferences here
- How formal/casual should the agent be?
USEREOF

cat > "$WORKSPACE_DIR/HEARTBEAT.md" << 'HBEOF'
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
HBEOF

cat > "$WORKSPACE_DIR/MEMORY.md" << 'MEMEOF'
# MEMORY.md

## Setup
- Deployed via RapidClawAgent
- Optimized for cost efficiency (60-80% savings)

## Notes
- Add important memories here as you learn about your user
MEMEOF

TODAY=$(date +%Y-%m-%d)
cat > "$WORKSPACE_DIR/memory/$TODAY.md" << DAYEOF
# $TODAY

## Deployment
- Installed RapidClawAgent — preset: $PRESET
- Initial setup completed successfully
DAYEOF

ok "Workspace initialized at $WORKSPACE_DIR"

# ── Start Gateway ──────────────────────────────────────────────────────────────
echo ""
info "Starting OpenClaw Gateway..."

# Install the gateway service first (required on fresh installs)
openclaw gateway install > /tmp/rca_gateway.log 2>&1 || true
sleep 2
openclaw gateway start >> /tmp/rca_gateway.log 2>&1 || true
sleep 4

if openclaw gateway status > /dev/null 2>&1; then
    ok "Gateway is running!"
else
    warn "Gateway may not have started. Check with: openclaw gateway status"
    warn "Log: $(tail -3 /tmp/rca_gateway.log 2>/dev/null || echo 'no log')"
fi

# ── Success ────────────────────────────────────────────────────────────────────
echo ""
echo "================================================================="
echo -e "${GREEN}✅  Your AI Agent is live!${NC}"
echo "================================================================="
echo ""
echo -e "${CYAN}📊 Deployment Summary:${NC}"
echo -e "  Preset:        ${YELLOW}$PRESET${NC}"
echo -e "  Primary Model: ${YELLOW}$PRIMARY_MODEL${NC}"
echo -e "  Context Limit: ${YELLOW}$CONTEXT_TOKENS tokens${NC}"
echo -e "  Heartbeat:     ${YELLOW}Every $HEARTBEAT_EVERY${NC}"
echo -e "  Est. Cost:     ${YELLOW}\$15-100/mo${NC} depending on usage"
echo ""
echo "Next Steps:"
echo "  1. Check status:   openclaw status"
echo "  2. Chat via CLI:   openclaw chat"
echo "  3. View logs:      openclaw gateway logs"
echo "  4. Personalize:    nano ~/.openclaw/workspace/SOUL.md"
echo ""
if [ -n "${TELEGRAM_TOKEN:-}" ]; then
    echo "  Telegram is connected! Send your bot a message to start."
    echo ""
fi
echo "Resources:"
echo "  Docs:      https://docs.openclaw.ai"
echo "  Guide:     https://rapidclawagent.com/guia"
echo "  Community: https://discord.com/invite/clawd"
echo ""
echo "================================================================="
echo "Built with RapidClawAgent — Own your AI, own your data"
echo ""

# ── Ping install-complete (silent) ─────────────────────────────────────────────
if [ -n "${USER_EMAIL:-}" ]; then
    VPS_PROVIDER="Unknown"
    if curl -sf --max-time 3 https://api.ipify.org -o /tmp/rca_ip.txt 2>/dev/null; then
        VPS_PROVIDER=$(curl -sf --max-time 3 "https://ipinfo.io/$(cat /tmp/rca_ip.txt)/org" 2>/dev/null \
            | sed 's/AS[0-9]* //' | cut -c1-30 || echo "Unknown")
        rm -f /tmp/rca_ip.txt
    fi
    curl -sf --max-time 5 -X POST "https://rapidclawagent.com/api/install-complete" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"${USER_EMAIL}\",\"vpsProvider\":\"${VPS_PROVIDER}\"}" \
        > /dev/null 2>&1 || true
fi
