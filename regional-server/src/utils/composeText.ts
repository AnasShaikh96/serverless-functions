// export const composeText = `
// services:
//   server:
//     build:
//       context: .
//     environment:
//       NODE_ENV: production
//     # ports:
//     #   - 3000:3000
//     `;



export const composeText = 
`
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    command: ["nodemon", "index.js"]
    environment:
      NODE_ENV: development
`

// commented PORT 3000 because of docker error of PORT is already under use
