import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "User controller is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can update only your account!"));
  }

  try {
    const updateData = {};

    if (req.body.username) {
      updateData.username = req.body.username;
    }
    if (req.body.email) {
      updateData.email = req.body.email;
    }
    if (req.body.password) {
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.profilePicture) {
      updateData.profilePicture = req.body.profilePicture;
    }

    console.log("Update data:", updateData);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }, // Returns the updated document
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password, ...otherDetails } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: otherDetails,
    });
  } catch (err) {
    next(err);
  }
  // Continue with update logic
};

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
}
