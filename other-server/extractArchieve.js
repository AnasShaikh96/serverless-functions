const AdmZip = require("adm-zip");

async function extractArchive(
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


module.exports = extractArchive