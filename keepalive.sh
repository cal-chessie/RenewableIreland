#!/bin/bash
cd /home/z/my-project
while true; do
  rm -rf .next
  npx next dev -p 3000 2>&1 | tee /tmp/next-auto.log &
  CPID=$!
  echo "$(date): Started dev server PID $CPID" >> /tmp/keepalive.log
  # Wait for it to die
  wait $CPID 2>/dev/null
  echo "$(date): Server died, restarting in 5s..." >> /tmp/keepalive.log
  sleep 5
done
