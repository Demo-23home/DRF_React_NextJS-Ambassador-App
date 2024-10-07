# Base image for frontend applications
FROM node:18 AS frontend

# Set the working directory
WORKDIR /app

# Copy and install dependencies for react-admin
COPY react-admin/package*.json ./react-admin/
RUN cd react-admin && npm install

# Copy and install dependencies for react-ambassador
COPY react-ambassador/package*.json ./react-ambassador/
RUN cd react-ambassador && npm install

# Copy and install dependencies for next-checkout
COPY next-checkout/package*.json ./next-checkout/
RUN cd next-checkout && npm install

# Copy the rest of the react-admin application code
COPY react-admin/ ./react-admin/

# Copy the rest of the react-ambassador application code
COPY react-ambassador/ ./react-ambassador/

# Copy the rest of the next-checkout application code
COPY next-checkout/ ./next-checkout/

# Expose necessary ports (optional, for documentation purposes)
EXPOSE 3000 4000 5000

# Note:
# We are not setting a default CMD here because each service in docker-compose.yml
# will specify its own command.
