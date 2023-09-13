const User = require("../model/user");

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.createAuthToken();
    res.send({ user, token });
  } catch (error) {
    if (error.message === "الاسم غير موجود") {
      return res.status(404).json({ error: "الاسم غير موجود" });
    } else if (error.message === "كلمة السر غير صحيحة") {
      return res.status(401).json({ error: "كلمة السر غير صحيحة" });
    } else {
      return res.status(500).send(error.message);
    }
  }
};

const logoutUser = async (req, res) => {
  if (req.user.tokens) {
    req.user[0].tokens = req.user[0]?.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user[0].save();
    res.send("You logged out");
  }

  res.send("the user is not found");
};
// JUST FOR ADMIN
const getUsers = async (req, res) => {
  try {
    const admins = req.user.filter((user) => user.isAdmin === true);

    if (admins.length > 0) {
      const users = await User.find({});
      const students = users.filter((user) => user.isAdmin === false);
      res.send(students);
    } else {
      res.status(400).send("you're not the admin");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const addUser = async (req, res) => {
  if (!req.user) {
    try {
      await new User(req.body).save();
      return res.send("admin added successfully");
    } catch (e) {
      res.status(500).send(e);
    }
  }
  const admins = req.user.filter((user) => user.isAdmin === true);

  if (admins.length > 0) {
    const user = new User(req.body);
    try {
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(400).send("You're not the admin");
  }
};

const deleteUser = async (req, res) => {
  try {
    const admins = req.user.filter((user) => user.isAdmin === true);
    if (admins.length > 0) {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        throw new Error("User is not found");
      } else {
        res.send("User has been deleted");
      }
    } else {
      res.status(400).send("You're not the admin");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send("No valid Update");
  }

  try {
    
    updates.forEach((update) => (req.user[0][update] = req.body[update]));
    
    await req.user[0].save();
    res.send(req.user);
  } catch (err) {
   
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
};
