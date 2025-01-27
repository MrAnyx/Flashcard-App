FROM  node:22.12-alpine as base
RUN npm install -g pnpm
WORKDIR /app

FROM base as build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM base as prod
ENV NODE_ENV=production
RUN npm install -g pm2
COPY --from=build /app/.output ./.output
COPY --from=build /app/ecosystem.config.cjs .
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]