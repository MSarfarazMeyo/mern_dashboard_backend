import { Schema, model } from "mongoose";

interface IProfile {
  name: string;
  email: string;
  picture: string;
  status: "In Progress" | "Complete" | "Draft";
  archived: boolean;
}

const profileSchema = new Schema<IProfile>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  status: {
    type: String,
    enum: ["In Progress", "Complete", "Draft"],
    default: "Draft",
  },
  archived: { type: Boolean, default: false },
});

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
