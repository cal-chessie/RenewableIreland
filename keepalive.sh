#!/bin/bash
while true; do
    cd /home/z/my-project
    npx next dev -p 3000 2>&1
    echo "[KEEPALIVE] Server died, restarting in 3s..."
    sleep 3
done
