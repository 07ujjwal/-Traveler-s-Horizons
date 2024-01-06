const User = require("../models/User");
const { uploadPicture } = require("../Middlewares/uplodePicture");
const { fileRemover } = require("../utils/fileRemover");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User has already registered" });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    if (await user.comparePassword(password)) {
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const userProfile = async function (req, res, next) {
  try {
    let user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        picture: user.picture,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 character");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedProfile = await user.save();

    res.json({
      _id: updatedProfile._id,
      picture: updatedProfile.picture,
      name: updatedProfile.name,
      email: updatedProfile.email,
      admin: updatedProfile.admin,
      token: await updatedProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const uplodeProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.picture;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.picture = req.file.filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            picture: updatedUser.picture,
            name: updatedUser.name,
            email: updatedUser.email,

            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.picture;
          updatedUser.picture = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            picture: updatedUser.picture,
            name: updatedUser.name,
            email: updatedUser.email,

            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  uplodeProfilePicture,
};
