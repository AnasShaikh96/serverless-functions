export const composeText = `
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    # ports:
    #   - 3000:3000
    `;


// commented PORT 3000 because of docker error of PORT is already under use
