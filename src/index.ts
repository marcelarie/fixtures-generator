const { faker } = require("@faker-js/faker");
const fs = require("fs");
const mockEntry = require("./mock-entry.ts");

function fileExists(filename: string) {
  try {
    fs.accessSync(filename);
    return true;
  } catch (ex) {
    return false;
  }
}

function checkAndAppendNumber(filename: string) {
  let newFilename = filename;
  let counter = 1;

  while (fileExists(newFilename + ".json")) {
    console.log("FILE EXISTS: ", newFilename);
    const extensionIndex = filename.lastIndexOf(".");
    const extension =
      extensionIndex !== -1 ? filename.slice(extensionIndex) : "";
    const baseFilename =
      extensionIndex !== -1 ? filename.slice(0, extensionIndex) : filename;

    newFilename = baseFilename + "-" + counter + extension;
    counter++;
  }

  return newFilename;
}

const FILE_NAME = checkAndAppendNumber("result/mock_data") + ".json";
const NUMBER_OF_ENTRIES = 2000000;

const writeStream = fs.createWriteStream(FILE_NAME, { flags: "a" });

let entry_number = 1;
let done = false;

function write() {
  let ok = true;
  do {
    if (entry_number > NUMBER_OF_ENTRIES) {
      writeStream.end();
      return;
    }

    console.log("n: ", entry_number);
    if (entry_number === NUMBER_OF_ENTRIES) {
      console.log("Generated", entry_number, "entries in", FILE_NAME);
    }
    ok = writeStream.write(
      JSON.stringify(mockEntry(entry_number)) + ",",
      (err: Error) => {
        if (err) throw err;
      }
    );

    entry_number++;
  } while (entry_number <= NUMBER_OF_ENTRIES && ok);

  if (entry_number <= NUMBER_OF_ENTRIES) {
    writeStream.once("drain", write);
  }
}

write();
