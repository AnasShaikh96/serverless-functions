


export const createPackageFile = (fnName: string) => {

  return (
    `{
      "name": "${fnName}",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "keywords": [],
      "author": "",
      "license": "ISC",
      "type": "commonjs",
      "dependencies": {
        "axios": "^1.13.2",
        "dotenv": "^17.2.3",
        "nodemon": "^3.1.10"
      }
    }`

  )
}