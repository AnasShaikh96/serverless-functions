export const createEnv = (baseUrl: string, owner: string, fnName: string) => {

    return `
        BASE_URL='${baseUrl}'
        OWNER_ID="${owner}"
        FUNCTION_NAME="${fnName}"
`
}