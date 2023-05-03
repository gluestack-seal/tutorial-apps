FROM hasura/graphql-engine:v2.16.1

# Install Hasura CLI
RUN apt-get update && apt-get install -y curl
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Set the working directory
WORKDIR /hasura

# Copy the files
COPY . /hasura

# Create a volume
VOLUME /hasura

# Expose port for Hasura GraphQL Engine
EXPOSE 8080

# Start Hasura GraphQL Engine and run Hasura commands
CMD /bin/bash -c "graphql-engine serve & \
    sleep 5s && \
    echo 'Clearing metadata...' && \
    hasura metadata clear --skip-update-check && \
    echo 'Applying migrations...' && \
    hasura migrate apply --all-databases --skip-update-check && \
    echo 'Applying metadata ...' && \
    hasura metadata apply --skip-update-check && \
    tail -f /dev/null"