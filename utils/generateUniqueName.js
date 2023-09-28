export const generateUniqueName = (name) => {
  const timestampDigits = 4;
  // remove all special characters and replace with "-"
  const plainName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  // add unique timestamp
  const timestamp = Date.now();
  const shortTimestamp = timestamp.toString().slice(-timestampDigits);
  const uniqueName = `${plainName}-${shortTimestamp}`;
  return uniqueName;
};
