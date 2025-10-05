import AdmZip from "adm-zip";

export async function extractArchive(
  filepath,
  dirName,
  fnname
) {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = dirName;
    zip.extractAllTo(outputDir);
    return outputDir + "/" + fnname;
  } catch (e) {
    console.log(e, "error from other server")
  }
}
