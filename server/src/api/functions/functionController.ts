import type { Request, Response } from "express"
import fs from 'fs'
import path from "path";

import AdmZip from "adm-zip"


const dummyId = "82e5e5f7-fdd7-4b21-8573-cb00cbd9b112"

async function extractArchive(filepath: string, dirName: string, fnname: string) {
    try {
        const zip = new AdmZip(filepath);
        const outputDir = dirName;
        zip.extractAllTo(outputDir);

        // console.log("filepathname", name)

        console.log(`Extracted to "${outputDir}" successfully ${zip}`);

        return outputDir + "/" + fnname;

    } catch (e) {
        console.log(`Something went wrong. ${e}`);
    }
}

export const createFunctionHandler = async (req: Request, res: Response) => {


    try {

        const userDir = `./src/executable-funcs`;
        const createDir = `./src/executable-funcs/${dummyId}`

        if (!fs.existsSync(createDir)) {
            fs.mkdirSync(createDir)
        }

        const pathUrl = await extractArchive('../helloDynamic.js.zip', createDir, "helloDynamic.js")

        res.status(200).json({
            message: "Testing funcs",
            pathUrl
        })



    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        })

    }
}