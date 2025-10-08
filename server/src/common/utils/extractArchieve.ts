import AdmZip from "adm-zip";
import { ServiceResponse } from "../models/serviceResponse";
import { StatusCodes } from "http-status-codes";

export async function extractArchive(
  filepath: string,
  dirName: string,
  fnname: string
) {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = dirName;
    zip.extractAllTo(outputDir);
    return outputDir + "/" + fnname;
  } catch (e) {
    ServiceResponse.failure(
      "Error while extracting the function",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
