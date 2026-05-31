#!/data/data/com.termux/files/usr/bin/bash
set -e

APP_NAME="NeuroClip"
APP_DIR="$HOME/.neuroclip"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[1] Membuat folder install..."
mkdir -p "$APP_DIR/src" "$APP_DIR/config" "$HOME/.shortcuts" /sdcard/termux

echo "[2] Copy source..."
cp -f "$SRC_DIR/src/"*.mjs "$APP_DIR/src/"
cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/providers.json"
cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/config/providers.json"

echo "[3] Membuat command neuro..."
mkdir -p "$PREFIX/bin"
cat > "$PREFIX/bin/neuro" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/cli.mjs" "$@"
EOF
chmod +x "$PREFIX/bin/neuro"

echo "[4] Membuat shortcut action untuk notifikasi..."
cat > "$HOME/.shortcuts/neuro-answer" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/answer.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-reply" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reply.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-reason" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reason.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-menu" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/menu.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-view" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/view.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-close" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/close.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-reset" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reset.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-on" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
neuro on
EOF

cat > "$HOME/.shortcuts/neuro-off" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
neuro off
EOF

chmod +x "$HOME/.shortcuts"/neuro-*

echo "[5] Cek syntax..."
node --check "$APP_DIR/src/core.mjs"
node --check "$APP_DIR/src/watch-confirm.mjs"
node --check "$APP_DIR/src/answer.mjs"
node --check "$APP_DIR/src/reply.mjs"
node --check "$APP_DIR/src/reason.mjs"
node --check "$APP_DIR/src/menu.mjs"
node --check "$APP_DIR/src/view.mjs"
node --check "$APP_DIR/src/reset.mjs"
node --check "$APP_DIR/src/mode.mjs"
node --check "$APP_DIR/src/cli.mjs"

echo ""
echo "✅ $APP_NAME terpasang."
echo ""
echo "Command:"
echo "  neuro on"
echo "  neuro off"
echo "  neuro status"
echo "  neuro mode form"
echo "  neuro run \"siapa presiden ke 2 indonesia\""
echo ""
echo "Untuk mode salin → notif:"
echo "  neuro on"
