const { faker } = require("@faker-js/faker");
const fs = require("fs");

const FILE_NAME = "mock_data-2.json";

const writeStream = fs.createWriteStream(FILE_NAME, { flags: "a" });

let i = 1;

function write() {
  let ok = true;
  do {
    if (i > 2000000) {
      writeStream.end();
      return;
    }

    const mockEntry = {
      id: i,
      name: `Text ${faker.string.alpha({ length: { min: 5, max: 10 } })}`,
      type: "SMS",
      businessUnit: "UK",
      zoneId: 1,
      contentTitle: `Text ${faker.string.alpha({
        length: { min: 5, max: 10 },
      })}`,
      contentBody: "Description",
      audienceQuery: {
        field: "driverId",
        operator: "in",
        value: [faker.number.int({ min: 100000, max: 999999 })],
      },
      scheduledDate: null,
      sentDate: faker.date.past(),
      status: "sent",
    };

    console.log("n: ", i);
    ok = writeStream.write(JSON.stringify(mockEntry) + ",", (err) => {
      if (err) throw err;
    });

    i++;
  } while (i <= 2000000 && ok);

  if (i <= 2000000) {
    writeStream.once("drain", write);
  }
}

write();
