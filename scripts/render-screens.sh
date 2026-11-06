#!/usr/bin/env bash
# Renders the product screens (bare devices, transparent background) from the store-mockup
# source into public/screens/*.webp, with the neutral demo data (?region=global; the store images keep the
# default set). Needs Google Chrome, cwebp and sips (macOS).
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="$PWD/public/screens"
SRC="$(cd ../Assest/store-mockups/_source && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

shot() { # kind screen scale name
  local kind=$1 screen=$2 scale=$3 name=$4 w h
  if [[ $kind == tablet ]]; then w=1078; h=1422; else w=419; h=878; fi
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor="$scale" \
    --allow-file-access-from-files --default-background-color=00000000 --virtual-time-budget=4000 \
    --window-size="$w,$h" --screenshot="$TMP/$name.png" "file://$SRC/device.html?kind=$kind&screen=$screen&region=global" >/dev/null 2>&1
  cwebp -quiet -q 88 -alpha_q 100 "$TMP/$name.png" -o "$OUT/$name.webp"
  echo "$OUT/$name.webp"
}

for s in dashboard tracking leave payslip approvals team tasks; do shot phone "$s" 2 "phone-$s"; done
# Renamed when the camera art changed: /screens is cached immutable, so new art needs a new name.
shot phone punch 2 phone-checkin
for s in dashboard tracking leave payroll work; do shot tablet "$s" 1.5 "tablet-$s"; done
# Phone art inside the generated Open Graph image (app/opengraph-image.tsx).
sips --resampleWidth 600 "$TMP/phone-tracking.png" --out "$OUT/og-phone.png" >/dev/null
echo "$OUT/og-phone.png"
