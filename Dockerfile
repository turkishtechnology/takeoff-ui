# syntax=docker/dockerfile:1

####################  BUILD  ####################
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git && corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
# Sadece Docusaurus dökümantasyonunu üret
RUN pnpm run build:docs

####################  RUNTIME  ##################
FROM nginx:1.25-alpine
COPY --from=builder /app/docs/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]