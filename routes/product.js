const express = require("express");

const router = express.Router();

const {getAllDetails,getAllProduct,AddUsers,updateUser,patchUser,deleteUser} = require("../controllers/product");
router.route("/").get(getAllDetails);
router.route("/user").get(getAllProduct);
router.route("/users").post(AddUsers);
router.route("/users/:username").put(updateUser);
router.route("/users/:username").patch(patchUser);
router.route("/users/:username").delete(deleteUser);
module.exports=router;