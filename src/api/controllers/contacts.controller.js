const contactsController = {};

const Contact = require("../../models/Contact");

// @desc    Get contacts list page
// @route   GET /contacts
// @access  Private
contactsController.index = async (req, res, next) => {
  let messages = [];
  try {
    const contacts = await Contact.find().sort({ lastName: "asc" });
    res.render("contacts/index", { contacts });
  } catch (err) {
    console.log("Server error 😥");
  }
};

// @desc    Get a contact
// @route   GET /contacts/:id
// @access  Private
contactsController.contact = async (req, res, next) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findOne({ _id: contactId });
    res.render("contacts/contact", { contact });
  } catch (err) {
    res.redirect("/contacts");
  }
};

// @desc    Get a page for new contact
// @route   GET /contacts/new
// @access  Private
contactsController.newContact = (req, res, next) => {
  res.render("contacts/new", {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });
};

// @desc    Send contact data
// @route   POST /contacts
// @access  Private
contactsController.addContact = async (req, res, next) => {
  let errors = [];
  const { firstName, lastName, email, contactNumber } = req.body;
  try {
    await Contact.create(req.body);
    req.flash("success_message", "Contact added successfully");
    res.redirect("/contacts");
  } catch (err) {
    if (err.name === "ValidationError") {
      errors = Object.values(err.errors).map((val) => {
        return { message: val.message };
      });
      res.render("contacts/new", {
        errors,
        firstName,
        lastName,
        email,
        contactNumber,
      });
    } else {
      errors = errors.push({ message: "Server error 😥" });
      res.render("contacts/new", {
        errors,
        firstName,
        lastName,
        email,
        contactNumber,
      });
    }
  }
};

// @desc    Get a page for edit a contact
// @route   GET /contacts/:id
// @access  Private
contactsController.editContact = async (req, res, next) => {
  // TODO: edit contact page
  res.send("editing a contact 😀");
};

// @desc    Send contact data
// @route   PUT /contacts
// @access  Private
contactsController.updateContact = async (req, res, next) => {
  // TODO: edit contact
  res.send("updating a contact");
};

// @desc    Delete contact data
// @route   DELETE /contacts/:id
// @access  Private
contactsController.deleteContact = async (req, res, next) => {
  // TODO: delete contact
  res.send("Deleting a contact");
};

module.exports = contactsController;
