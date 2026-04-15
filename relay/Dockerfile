FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production

COPY src/ src/
COPY tsconfig.json ./

RUN mkdir -p /data/files

EXPOSE 8080
CMD ["bun", "run", "src/index.ts"]
