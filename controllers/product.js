const Login = require("../models/Logins");
const User = require("../models/Users");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide both username and password' });
  }

  try {
    // Find user in the 'Login' model by username
    const user = await Login.findOne({ Username: username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Direct password comparison (not recommended for production)
    if (user.Password !== password) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // If valid, send 'ok' response
    return res.status(200).json({ msg: 'ok',"user":user.User });

  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// GET: All login details (only Username and Password)
const getAllDetails = async (req, res) => {
  try {
    const data = await Login.find({}, 'Username Password User -_id');
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

  // Validate input fields
  if (!data.id || !data.user || !data.dailyInstallment || !data.amount) {
    return res.status(400).json({ msg: 'Please provide all fields (id, user, dailyInstallment, amount)' });
  }

  try {

    const existingUser = await User.findOne({ id: data.id });

    if (existingUser) {
      return res.status(409).json({ msg: 'User with this ID already exists' }); // 409 Conflict
    }

    
    const newUser = new User(data);
    const result = await newUser.save();
    res.status(201).json({ msg: 'User created successfully', user: result });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding user', error });
  }
};


// PUT: Update entire user by username
const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const updateData = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { id: id },
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
  const { id } = req.params;
  const patchData = req.body;

  try {
    const patched = await User.findOneAndUpdate(
      { id: id },
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
  const { id } = req.params;

  try {
    const result = await User.findOneAndDelete({ id: id });
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
  deleteUser,
  loginUser
};
