const { faker } = require("@faker-js/faker");

function mockEntry(id: number) {
    return {
        id: id,
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
};


export { mockEntry };
