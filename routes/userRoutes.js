const router = require("express").Router();
const {
  getHomepage,
  registeruser,
  loginuser,
  logout,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

/**
 * @desc Opens the user homepage
 * @route GET /api/v1/user
 * @access Public
 */
router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getHomepage);

router.route("/register").post(registeruser);

router.route("/login").post(loginuser);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;
