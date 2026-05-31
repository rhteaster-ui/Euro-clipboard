#!/data/data/com.termux/files/usr/bin/bash
set -e

mkdir -p "$HOME/.shortcuts"

cat > "$HOME/.shortcuts/neuro-on" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
neuro on
EOF

cat > "$HOME/.shortcuts/neuro-off" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
neuro off
EOF

cat > "$HOME/.shortcuts/neuro-answer" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/answer.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-reply" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reply.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

cat > "$HOME/.shortcuts/neuro-reset" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/reset.mjs" >> "$HOME/neuroclip.log" 2>&1
EOF

chmod +x "$HOME/.shortcuts"/neuro-*

echo "✅ Termux:Widget shortcut dibuat:"
echo "  neuro-on"
echo "  neuro-off"
echo "  neuro-answer"
echo "  neuro-reply"
echo "  neuro-reset"
