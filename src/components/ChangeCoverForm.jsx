import React, { useState } from "react";
import api from "../utils/api";

const ChangeCoverForm = ({ id, onUpdateCover }) => {
  const [coverFile, setCoverFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangeCover = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("cover", coverFile);

      // Update cover melalui API
      const newCoverUrl = await api.changeCoverPost({ id, cover: coverFile });
      setSuccessMessage("Cover berhasil diupdate!");
      if (onUpdateCover) {
        onUpdateCover(newCoverUrl); // Callback untuk update cover di PostDetailPage
      }
    } catch (error) {
      console.error("Gagal mengupdate cover:", error.message);
    }
  };

  return (
    <form onSubmit={handleChangeCover}>
      <div>
        <label>Choose New Cover:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverFile(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Update Cover
      </button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default ChangeCoverForm;
