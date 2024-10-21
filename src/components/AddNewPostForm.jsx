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
    <div className="container mt-4">
      <h1>Add New Post</h1>
      <div className="card">
        <div className="card-body">
          {/* Input untuk judul post */}

          {/* Input untuk cover gambar */}
          <div className="mb-3">
            <label htmlFor="postCover" className="form-label">
              Cover Image
            </label>
            <input
              type="file"
              id="postCover"
              className="form-control"
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])} // Mengambil file cover
            />
          </div>

          {/* Input untuk deskripsi */}
          <div className="mb-3">
            <label htmlFor="postDescription" className="form-label">
              Description
            </label>
            <textarea
              id="postDescription"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter post description"
              rows="4"
            />
          </div>

          {/* Tombol Submit */}
          <button onClick={handleAddPost} className="btn btn-primary">
            Add Post
          </button>

          {/* Menampilkan pesan sukses jika post berhasil ditambahkan */}
          {successMessage && (
            <p className="text-success mt-3">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewPostForm;
