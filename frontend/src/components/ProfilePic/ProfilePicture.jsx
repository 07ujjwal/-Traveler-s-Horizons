import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { toast } from "react-hot-toast";
import PictureComponent from "./PictureComponent";

function UpdateProfilePicture() {
  const { user, updateProfilePicture } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdatePicture = async () => {
    try {
      if (!selectedFile) {
        toast.error("Please select a file before updating.");
        return;
      }

      console.log(selectedFile);

      const formData = new FormData();
      formData.append("profilePicture", selectedFile);

      await updateProfilePicture({ token: user.token, formData });

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <PictureComponent />

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            height: "4rem",
            width: "50vw",
            marginTop: "0.5rem",
            background: "black",
          }}
        />
        <button
          onClick={handleUpdatePicture}
          style={{
            margin: "1rem",
            width: "15rem",
            height: "2.6rem",
            backgroundColor: "lightgreen",
            border: "5px",
            borderRadius: "10px",
          }}
        >
          Update Profile Picture
        </button>
      </div>
    </div>
  );
}

export default UpdateProfilePicture;
