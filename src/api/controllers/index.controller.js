const indexController = {};

// @desc    Get home, redirect to contacts page
// @route   GET /
// @access  Private
indexController.index = (req, res, next) => {
  res.redirect("/contacts");
};

module.exports = indexController;
