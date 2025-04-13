const express = require("express");

const router = express.Router();

const {getAllDetails,getAllProduct,AddUsers,updateUser,patchUser,deleteUser,loginUser} = require("../controllers/product");
router.route("/").get(getAllDetails);
router.route("/user").get(getAllProduct);
router.route("/users").post(AddUsers);
router.route("/Login").post(loginUser);
router.route("/users/:username/:id").put(updateUser);
router.route("/users/:username/:id").patch(patchUser);
router.route("/users/:username/:id").delete(deleteUser);
module.exports=router;