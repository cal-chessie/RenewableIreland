#!/bin/bash
cd /home/z/my-project
LOG="/tmp/keepalive2.log"
echo "$(date): Keepalive starting" >> "$LOG"

while true; do
  echo "$(date): Starting dev server on port 3000" >> "$LOG"
  npx next dev -p 3000 >> /tmp/next-server.log 2>&1
  EXIT=$?
  echo "$(date): Server exited with code $EXIT, restarting in 3s..." >> "$LOG"
  sleep 3
done
