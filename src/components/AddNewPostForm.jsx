import React, { useState } from "react";
import api from "../utils/api";

const AddNewPostForm = () => {
  const [cover, setCover] = useState(null);
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddPost = async (event) => {
    event.preventDefault();
    try {
      const postId = await api.addNewPost({ cover, description });
      setSuccessMessage(`Posting baru berhasil dibuat dengan ID: ${postId}`);
    } catch (error) {
      console.error("Gagal membuat posting baru:", error.message);
    }
  };

  return (
    <form onSubmit={handleAddPost} className="container mt-5">
      <div className="form-group">
        <label htmlFor="cover">Cover Image:</label>
        <input
          type="file"
          id="cover"
          className="form-control-file"
          onChange={(e) => setCover(e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter post description"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Post
      </button>
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
    </form>
  );
};

export default AddNewPostForm;
