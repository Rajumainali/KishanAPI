const Login = require("../models/Logins");
const User = require("../models/Users"); // Use this require statement and remove any duplicates

// POST: Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
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
    return res.status(200).json({ msg: 'ok', "user": user.User });
    
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// GET: All login details (only Username, Password, and User)
const getAllDetails = async (req, res) => {
  try {
    const data = await Login.find({}, 'Username Password User -_id');
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ msg: "Error fetching data", error });
  }
};

// GET: All user documents (each with their embedded records)
const getAllProduct = async (req, res) => {
  try {
    // Exclude _id and __v if desired
    const data = await User.find({}, { _id: 0, __v: 0 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching data", error });
  }
};

// POST: Add a new record for a user (or create a new user document if one doesn't exist)
const AddUsers = async (req, res) => {
  const { username, id, user, dailyInstallment, amount,details,email,who } = req.body;
   console.log(details)
  // Validate input fields
  if (!username || !id || !user || !dailyInstallment || !amount || !details || !email || !who) {
    return res.status(400).json({
      msg: 'Please provide all fields (username, id, user, dailyInstallment, amount,details,email,who )'
    });
  }

  try {
    // Check if the user document already exists
    let existingUser = await User.findOne({ username });

    // If user exists, check if a record with the same id exists inside data
    if (existingUser) {
      const duplicate = existingUser.data.find(record => record.id === id);
      if (duplicate) {
        return res.status(409).json({ msg: 'Record with this id already exists for this user' });
      }
      // Push new record into the data array
      existingUser.data.push({ id, user, dailyInstallment, amount,details,email,who });
      const result = await existingUser.save();
      return res.status(201).json({ msg: 'Record added to existing user', user: result });
    } else {
      // Create a new user document with the first embedded record
      const newUser = new User({
        username,
        data: [{ id, user, dailyInstallment, amount,details,email,who }]
      });
      const result = await newUser.save();
      return res.status(201).json({ msg: 'User created successfully', user: result });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error adding user record', error });
  }
};

// PUT: Update an entire embedded record for a given user
// Expecting route parameters: username and record id (recordId)
const updateUser = async (req, res) => {
  const { username, id } = req.params;
  console.log(username,id)
  const updateData = req.body; // Expect all fields for the embedded record

  try {
    // The $ positional operator updates the matched element in the "data" array.
    const updated = await User.findOneAndUpdate(
      { username, "data.id": Number(id) },
      { $set: { "data.$": updateData } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ msg: 'User or record not found' });
    }
    res.status(200).json({ msg: "User record updated", user: updated });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user record", error });
  }
};

// PATCH: Partially update an embedded record for a given user
// Expecting route parameters: username and record id (recordId)
const patchUser = async (req, res) => {
  const { username, id } = req.params;
  const patchData = req.body;

  try {
    // Use the positional operator to update specific fields in the matched embedded record
    const patched = await User.findOneAndUpdate(
      { username, "data.id": Number(id) },
      { $set: Object.keys(patchData).reduce((acc, key) => {
          // create the update key, e.g., "data.$.dailyInstallment": patchData.dailyInstallment
          acc[`data.$.${key}`] = patchData[key];
          return acc;
        }, {}) },
      { new: true }
    );
    if (!patched) {
      return res.status(404).json({ msg: 'User or record not found' });
    }
    res.status(200).json({ msg: "User record patched", user: patched });
  } catch (error) {
    res.status(500).json({ msg: "Error patching user record", error });
  }
};

// DELETE: Remove an embedded record by username and record id
const deleteUser = async (req, res) => {
  const { username, id } = req.params;

  try {
    // Use $pull to remove the record that matches the given id from the data array
    const result = await User.findOneAndUpdate(
      { username },
      { $pull: { data: { id: Number(id) } } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ msg: 'User not found or record does not exist' });
    }
    res.status(200).json({ msg: "User record deleted", user: result });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user record", error });
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
