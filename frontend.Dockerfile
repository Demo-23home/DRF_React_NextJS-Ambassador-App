# # Use the official Node.js image as the base for frontend applications
# FROM node:18 AS frontend

# # Set the working directory in the container
# WORKDIR /app

# # Copy all package.json files from all frontend applications
# # COPY next-checkout/package*.json ./next-checkout/
# # COPY react-admin/package*.json ./react-admin/
# COPY react-ambassador/package*.json ./react-ambassador/

# # Install dependencies for all frontend applications
# # RUN cd next-checkout && npm install
# # RUN cd react-admin && npm install
# RUN cd react-ambassador && npm install

# # Set the working directory for the Next.js app
# # WORKDIR /app/next-checkout

# # Build Next.js application
# # RUN npm run build

# # Set the working directory for React Admin app
# # WORKDIR /app/react-admin

# # Build React Admin application
# # RUN npm run build

# # Set the working directory for React Ambassador app
# WORKDIR /app/react-ambassador

# # Build React Ambassador application
# # RUN npm run build

# # Set the command to run the Next.js app
# WORKDIR /app/next-checkout
# CMD ["npm", "run"]

# # Expose the port for the Next.js app
# # EXPOSE 5000


# # Use the official Node.js image as the base for frontend applications
# FROM node:18 AS frontend

# # Set the working directory in the container
# WORKDIR /app/

# # Copy package.json and package-lock.json for both applications
# COPY react-ambassador/package*.json ./react-ambassador/
# COPY react-admin/package*.json ./react-admin/

# # Install dependencies for both applications
# RUN cd react-admin && npm install
# RUN cd react-ambassador && npm install

# # Copy the rest of the application code
# COPY react-ambassador/ ./react-ambassador/
# COPY react-admin/ ./react-admin/


# CMD ["npm", "start"]

# # Expose the port for React Ambassador app (Change if needed)
# EXPOSE 3000



# # Use the official Node.js image as the base for frontend applications
# FROM node:18 AS frontend

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json for all frontend applications
# COPY react-ambassador/package*.json ./react-ambassador/
# COPY react-admin/package*.json ./react-admin/
# COPY next-checkout/package*.json ./next-checkout/

# # Install dependencies for react-admin
# RUN cd react-admin && npm install

# # Install dependencies for react-ambassador
# RUN cd react-ambassador && npm install

# # Install dependencies for next-checkout
# RUN cd next-checkout && npm install

# # Copy the rest of the application code for react-admin
# COPY react-admin/ ./react-admin/

# # Copy the rest of the application code for react-ambassador
# COPY react-ambassador/ ./react-ambassador/

# # Copy the rest of the application code for next-checkout
# COPY next-checkout/ ./next-checkout/

# # Note:
# # We're not setting a specific WORKDIR or CMD here because each service
# # (react-admin, react-ambassador, next-checkout) will set its own
# # working directory and command in docker-compose.yml

# # Optional: Expose ports for documentation purposes (not strictly necessary)
# EXPOSE 3000 4000 5000



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
