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
    
RUN npm install -g nodemon

USER node

COPY . .

# EXPOSE 3000

CMD ["nodemon", "index.js"]
`;
};


// commented PORT 3000 because of docker error of PORT is already under use