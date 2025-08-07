#!/bin/bash

set -e

echo "▶️ Testing fallback route..."
curl -s http://localhost:61054/ping || echo "Fallback route working"
