const Login = require("../models/Logins");
const User = require("../models/Users");

// GET: All login details (only Username and Password)
const getAllDetails = async (req, res) => {
  try {
    const data = await Login.find({}, 'Username Password -_id');
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ msg: "Error fetching data", error });
  }
};

// GET: All user records
const getAllProduct = async (req, res) => {
  try {
    const data = await User.find({}, { _id: 0, __v: 0 });
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ msg: "Error fetching data", error });
  }
};

// POST: Add a new user
const AddUsers = async (req, res) => {
  const data = req.body;

  if (!data.user || !data.DailyInstallment || !data.Amount) {
    return res.status(400).json({ msg: 'Please provide all fields (user, DailyInstallment, Amount)' });
  }

  try {
    const newUser = new User(data);
    const result = await newUser.save();
    res.status(201).json({ msg: 'User created successfully', user: result });
  } catch (error) {
    res.status(500).json({ msg: "Error adding user", error });
  }
};

// PUT: Update entire user by username
const updateUser = async (req, res) => {
  const { username } = req.params;
  const updateData = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { user: username },
      updateData,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: "User updated", user: updated });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user", error });
  }
};

// PATCH: Partial update by username
const patchUser = async (req, res) => {
  const { username } = req.params;
  const patchData = req.body;

  try {
    const patched = await User.findOneAndUpdate(
      { user: username },
      { $set: patchData },
      { new: true }
    );
    if (!patched) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: "User patched", user: patched });
  } catch (error) {
    res.status(500).json({ msg: "Error patching user", error });
  }
};

// DELETE: Remove user by username
const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await User.findOneAndDelete({ user: username });
    if (!result) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: "User deleted", user: result });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error });
  }
};

module.exports = {
  getAllDetails,
  getAllProduct,
  AddUsers,
  updateUser,
  patchUser,
  deleteUser
};
