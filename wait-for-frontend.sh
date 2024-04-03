#!/bin/sh

# Function to check if the frontend service is available
wait_for_frontend() {
    echo "Waiting for frontend service to be available..."
    until curl -sSf http://frontend:3000 >/dev/null; do
        echo "Waiting for frontend service to be available..."
        sleep 1
    done
}

# Call the function to wait for the frontend service
wait_for_frontend

echo "Frontend service is available! Starting Nginx..."
# Execute the passed command (e.g., nginx)
exec "$@"
