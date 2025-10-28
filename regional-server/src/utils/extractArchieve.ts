import AdmZip from "adm-zip";

async function extractArchive(
  filepath: string,
  dirName: string,
  fnname: string
): Promise<string | undefined> {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = dirName;
    zip.extractAllTo(outputDir);
    return outputDir + "/" + fnname;
  } catch (e) {
    console.log(e, "error from other server");
  }
}



export default extractArchive;
