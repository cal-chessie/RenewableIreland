#!/bin/bash
# Keepalive wrapper for Next.js dev server
cd /home/z/my-project

while true; do
    echo "$(date): Starting bun run dev" >> /tmp/ka.log
    bun run dev >> /tmp/ka-dev.log 2>&1
    CODE=$?
    echo "$(date): Exited code=$CODE, restarting in 2s" >> /tmp/ka.log
    sleep 2
done
