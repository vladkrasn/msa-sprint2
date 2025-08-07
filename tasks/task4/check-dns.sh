#!/bin/bash

set -e

echo "▶️ Running in-cluster DNS test..."

winpty kubectl run dns-test --rm -it \
  --image=busybox \
  --restart=Never \
  -- wget -qO- http://booking-service-test:8080/ping && echo "✅ Success" || echo "❌ Failed"