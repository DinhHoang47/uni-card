export const generateUniqueName = (name) => {
  const timestampDigits = 10;
  // remove all special characters (except kanji ...) and replace with "-"
  const specialCharsRegex = /[^\p{L}\p{N}]+/gu;
  const plainName = name.toLowerCase().replace(specialCharsRegex, "-");
  // add unique timestamp
  const timestamp = Date.now();
  const shortTimestamp = timestamp.toString().slice(-timestampDigits);
  const uniqueName = `${plainName}-${shortTimestamp}`;
  return uniqueName;
};
