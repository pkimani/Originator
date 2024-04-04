#!/bin/sh

# Function to check if a GraphQL service is available by sending a simple query
wait_for_graphql_service() {
    SERVICE_URL=$1
    echo "Waiting for GraphQL service at $SERVICE_URL to be available..."
    until curl -sSf -X POST -H "Content-Type: application/json" --data '{ "query": "{ hello }" }' $SERVICE_URL >/dev/null; do
        echo "Still waiting for GraphQL service at $SERVICE_URL to be available..."
        sleep 1
    done
    echo "GraphQL service at $SERVICE_URL is available."
}

# Wait for the backend GraphQL service to become available
wait_for_graphql_service http://backend:3001/graphql

echo "All services are available! Starting Nginx..."
# Execute the passed command (e.g., nginx)
exec "$@"
