#!/bin/bash
#
# Test install script locally
# Usage: ./scripts/test-install.sh [preset]
#

set -e

PRESET="${1:-personal-assistant}"

echo "🧪 Testing install script with preset: $PRESET"
echo ""

# Run install script with preset arg
bash ./public/install.sh "$PRESET"
