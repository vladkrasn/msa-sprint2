#!/bin/bash

set -e

echo "▶️ Checking booking-service deployment..."
kubectl get pods -l app=booking-service-test

echo
echo "▶️ Checking service..."
kubectl get svc booking-service-test || echo "(No service found)"

echo
echo "▶️ Helm release:"
helm list | grep booking-service-test || echo "(No release found)"

echo
echo "▶️ Port-forward to test service locally:"
echo "  kubectl port-forward svc/booking-service-test 8080:8080"
echo "  Then in another terminal:"
echo "    curl http://localhost:8080/ping"

echo
echo "▶️ Quick curl (if port-forward already running):"
curl --fail http://localhost:8080/ping && echo "✅ Reachable" || echo "❌ Not responding"
