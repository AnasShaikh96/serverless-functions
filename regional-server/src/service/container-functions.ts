import { execa } from "execa"
import fs from 'fs'


export const getContainerFunction = async (fnName: string, workingDir: string) => {

    try {
        let fnStatus = false;

        const dockerCommand = `docker ps --filter "ancestor=${fnName.toLowerCase()}-app" --format '{{.State}}'`
        const { stdout, stdio } = await execa(dockerCommand, { shell: true, cwd: workingDir })

        if (stdout.length > 0) {
            fnStatus = true;
        }
        return { status: fnStatus, io: stdio }

    } catch (error) {
        console.log('error in getContainerFunction:', error)
        return { status: false, io: error }
    }
}


export const deleteContainerFunction = async (fnName: string, workingDir: string) => {

    try {

        const { status } = await getContainerFunction(fnName, workingDir);
      
        if (status) {
            await execa('docker', ['compose', 'down'], { cwd: workingDir });
        }

        fs.rm(workingDir, { recursive: true, force: true }, (err) => {
            if (err) {
                console.log('error while deleting function.')
            }
        })

    } catch (error) {
        throw new Error(error)
    }
}


export const createContainerFunction = async () => {
    
}