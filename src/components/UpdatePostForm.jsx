import React, { useState } from "react";
import api from "../utils/api";

const UpdatePostForm = ({ postId }) => {
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdatePost = async (event) => {
    event.preventDefault();

    // Validasi input
    if (!description.trim()) {
      setErrorMessage("Deskripsi tidak boleh kosong!");
      return;
    }

    try {
      await api.updatePost({ postId, description });
      setSuccessMessage("Deskripsi berhasil diupdate!");
      setErrorMessage(""); // Reset error message
      setDescription(""); // Reset input field
    } catch (error) {
      console.error("Gagal mengupdate deskripsi:", error.message);
      setErrorMessage("Gagal mengupdate deskripsi. Silakan coba lagi.");
      setSuccessMessage(""); // Reset success message
    }
  };

  return (
    <form onSubmit={handleUpdatePost}>
      <div>
        <label>New Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Update description"
        />
      </div>
      <button type="submit">Update Post</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default UpdatePostForm;
