import { Router } from "express";
import {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  toggleArchiveProfile,
} from "../controllers/profileController";

const router = Router();

router.post("/profiles", createProfile);
router.get("/profiles", getProfiles);
router.patch("/profiles/:id", updateProfile);
router.delete("/profiles/:id", deleteProfile);
router.patch("/profiles/:id/archive", toggleArchiveProfile);

export default router;
