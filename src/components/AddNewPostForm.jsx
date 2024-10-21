import React, { useState } from "react";
import api from "../utils/api";

const AddNewPostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddPost = async (event) => {
    event.preventDefault();

    try {
      // Mengirim request untuk menambahkan post baru
      const newPostId = await api.addNewPost({ title, cover, description });
      setSuccessMessage("Post berhasil ditambahkan!");

      // Reset form setelah post berhasil ditambahkan
      setCover(null);
      setDescription("");

      // Memanggil callback setelah post berhasil ditambahkan
      if (onPostAdded) {
        onPostAdded(newPostId); // Opsional: update parent component atau redirect
      }
    } catch (error) {
      console.error("Gagal menambahkan post:", error.message);
    }
  };

  return (
    <form onSubmit={handleAddPost}>
      <div>
        <label>Cover Image:</label>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter post description"
        />
      </div>
      <button type="submit">Add Post</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default AddNewPostForm;
