#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.shortcuts"

cat > "$HOME/.shortcuts/neuro-on" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
neuro on
EOS

cat > "$HOME/.shortcuts/neuro-off" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
neuro off
EOS

cat > "$HOME/.shortcuts/neuro-answer" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/answer.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

cat > "$HOME/.shortcuts/neuro-reply" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reply.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

cat > "$HOME/.shortcuts/neuro-reason" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reason.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

cat > "$HOME/.shortcuts/neuro-menu" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/menu.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

cat > "$HOME/.shortcuts/neuro-view" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/view.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

cat > "$HOME/.shortcuts/neuro-close" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/close.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

cat > "$HOME/.shortcuts/neuro-reset" <<'EOS'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reset.mjs" >> "$HOME/neuroclip.log" 2>&1
EOS

chmod +x "$HOME/.shortcuts"/neuro-*

echo "✅ Termux:Widget shortcut dibuat:"
echo "  neuro-on"
echo "  neuro-off"
echo "  neuro-answer"
echo "  neuro-reply"
echo "  neuro-reason"
echo "  neuro-menu"
echo "  neuro-view"
echo "  neuro-close"
echo "  neuro-reset"
