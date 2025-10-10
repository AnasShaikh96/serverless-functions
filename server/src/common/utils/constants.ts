export const composeText = `
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
    `;

export const makeDockerFile = (nodeV: string) => {
  return `
ARG NODE_VERSION=${nodeV}

FROM node:${nodeV}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \\
    --mount=type=bind,source=package-lock.json,target=package-lock.json \\
    --mount=type=cache,target=/root/.npm \\
    npm ci --omit=dev
    
USER node

COPY . .

EXPOSE 3000

CMD node index.js
    `;
};
