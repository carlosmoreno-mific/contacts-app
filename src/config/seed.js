const faker = require("faker");
const Contact = require("../models/Contact");

const seedContacts = async () => {
  const contactsFound = await Contact.find().countDocuments();

  if (contactsFound != 0) return;

  for (let index = 0; index < 25; index++) {
    try {
      const contact = await Contact.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        contactNumber: faker.phone.phoneNumber(),
      });
      console.log(`contact #${index} created`);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { seedContacts };
