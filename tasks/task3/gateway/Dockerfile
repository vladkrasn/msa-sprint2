FROM oven/bun:1.2.19

WORKDIR /app

COPY . .
RUN bun install --prod --frozen-lockfile

CMD ["bun", "start"]
