# backend.dockerfile

FROM node:20-alpine as backend

# Define build arguments (optional)
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG DB_HOST
ARG DB_PORT
ARG BACKEND_PORT

# Set environment variables for runtime
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_PORT=${DB_PORT}
ENV DB_HOST=${DB_HOST}
ENV BACKEND_PORT=${BACKEND_PORT}

WORKDIR /app
COPY package*.json ./
RUN npm install

# Set DATABASE_URL environment variable for Prisma
ENV DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
COPY prisma ./prisma

# Run Prisma migration during build (note: this assumes the DB is accessible during the build process)
RUN npx prisma migrate dev --preview-feature

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
