const express = require("express");

const router = express.Router();

const {getAllDetails,getAllProduct,AddUsers,updateUser,patchUser,deleteUser,loginUser} = require("../controllers/product");
router.route("/").get(getAllDetails);
router.route("/user").get(getAllProduct);
router.route("/users").post(AddUsers);
router.route("/Login").post(loginUser);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").patch(patchUser);
router.route("/users/:id").delete(deleteUser);
module.exports=router;