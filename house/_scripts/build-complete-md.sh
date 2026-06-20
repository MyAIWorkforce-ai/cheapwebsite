#!/bin/bash
# Build a <BUNDLE>-COMPLETE.md single-file edition of each House bundle
# and re-zip the bundle so the COMPLETE.md sits at the top level inside.
# Output zip + COMPLETE.md filenames match the public listing slug, not
# the internal folder name (e.g. site-builder → website-builder-agent).
set -e

BASE="/home/user/cheapwebsite/house"
BUNDLES=("site-builder" "real-estate-agent" "stripe-setup" "social-media-manager" "electrician-agent")

# Per-bundle nice display name (used in the COMPLETE.md header).
declare -A NICE=(
  [site-builder]="Website Builder Agent"
  [real-estate-agent]="Real Estate Agent"
  [stripe-setup]="Stripe Setup Agent"
  [social-media-manager]="Social Media Manager Agent"
  [electrician-agent]="Electrician Agent"
)

# Public-facing slug for the output zip + COMPLETE.md filename.
# Buyers see this on download — keep it aligned with the listing title.
declare -A SLUG=(
  [site-builder]="website-builder-agent"
  [real-estate-agent]="real-estate-agent"
  [stripe-setup]="stripe-setup-agent"
  [social-media-manager]="social-media-manager-agent"
  [electrician-agent]="electrician-agent"
)

# Clean out any stale zips from previous slugs so the bundles folder
# only contains the current public-facing names.
rm -f "$BASE/_bundles/"*.zip

for B in "${BUNDLES[@]}"; do
  echo "=== Building COMPLETE.md for $B ==="
  cd "$BASE/$B"
  NAME="${NICE[$B]}"
  PUBLIC_SLUG="${SLUG[$B]}"
  UPPER=$(echo "$PUBLIC_SLUG" | tr '[:lower:]' '[:upper:]')
  OUT_NAME="${UPPER}-COMPLETE.md"
  OUT="/tmp/${OUT_NAME}"

  # Header — explains how to use this single-file edition.
  cat > "$OUT" << HEADER
# ${NAME} — Complete (single-file edition)

**How to use this file (60 seconds, no folders, no projects):**

1. Open **claude.ai** (or ChatGPT, OpenClaw, whichever you use).
2. Start a new chat.
3. Click the **+** or **paperclip** icon → upload this .md file as an attachment.
4. Send a message: *"Use this file as your full instructions. I want to set up [your business/project]."*

That's it. Claude reads the whole brain in one shot and runs the intake to lock in your details, then handles the work end-to-end.

Alternative — if file upload isn't working on your device:
- Open this file in any text editor (TextEdit, Notes, Word, anything)
- Hit Cmd+A (or Ctrl+A) to select all
- Cmd+C to copy
- Paste the whole thing into a new Claude chat as your first message
- Then say *"Use the above as your full instructions. Run intake for [your project/business]."*

Either path gives you the same working agent.

---

HEADER

  # Concatenate every .md file in the bundle, EXCEPT the two internal-only
  # files (LISTING_COPY.md, PUBLISH.md). Sort alphabetically so the order
  # is deterministic across rebuilds.
  find . -type f -name "*.md" \
    -not -name "LISTING_COPY.md" \
    -not -name "PUBLISH.md" \
    -not -name "${OUT_NAME}" \
    | sed 's|^\./||' \
    | sort \
    | while read -r f; do
        printf "\n\n---\n\n# FILE: %s\n\n" "$f" >> "$OUT"
        cat "$f" >> "$OUT"
      done

  # Stage the COMPLETE.md at the top of the bundle folder, then re-zip
  # under the PUBLIC slug (not the internal folder name).
  cp "$OUT" "./${OUT_NAME}"
  cd "$BASE"
  zip -rq "_bundles/${PUBLIC_SLUG}.zip" "$B" \
    -x "${B}/PUBLISH.md" "${B}/LISTING_COPY.md"
  rm -f "$BASE/$B/${OUT_NAME}"

  SIZE=$(ls -lh "_bundles/${PUBLIC_SLUG}.zip" | awk '{print $5}')
  CHARS=$(wc -c "$OUT" | awk '{print $1}')
  echo "  → ${PUBLIC_SLUG}.zip rebuilt (${SIZE}), COMPLETE.md = ${CHARS} chars"
  echo ""
done

echo "All bundles done. Zips in /home/user/cheapwebsite/house/_bundles/"
ls -lh "$BASE/_bundles/"
