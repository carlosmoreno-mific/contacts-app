const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth");
const contactsController = require("../controllers/contacts.controller");

router.use(authMiddleware.ensureAuthenticated);

router.get("/", contactsController.index);
router.get("/new", contactsController.newContact);
router.get("/:id", contactsController.contact);
router.post("/", contactsController.addContact);
router.get("/:id/edit", contactsController.editContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
