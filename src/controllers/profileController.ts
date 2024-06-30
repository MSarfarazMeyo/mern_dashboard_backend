import { Request, Response } from "express";
import Profile from "../models/profileModel";
import uploadPicture, { fileRemover } from "../helpers/uploadPictureMiddleware";

export const createProfile = [
  uploadPicture.single("picture"),
  async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const picture = req.file?.filename;

      const newProfile = new Profile({ name, email, picture });
      await newProfile.save();

      res.status(201).json(newProfile);
    } catch (error) {
      res.status(400).json({ message: "error" });
    }
  },
];

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bodyData = req.body;
    const picture = req.file?.filename;
    if (picture) {
      const profl = await Profile.findById(id);
      if (profl && profl?.picture) {
        fileRemover(profl.picture);
      }
      bodyData.picture = picture;
    }
    const updatedProfile = await Profile.findByIdAndUpdate(id, bodyData, {
      new: true,
    });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const profl = await Profile.findById(id);

    if (profl && profl?.picture) {
      fileRemover(profl.picture);
    }

    await Profile.findByIdAndDelete(id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

export const toggleArchiveProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (profile) {
      profile.archived = !profile.archived;
      await profile.save();
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};
