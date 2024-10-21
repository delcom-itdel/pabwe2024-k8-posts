import React, { useState } from 'react';
import api from '../api/api';

const UpdatePostForm = ({ postId }) => {
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    try {
      await api.updatePost({ postId, description });
      setSuccessMessage('Deskripsi berhasil diupdate!');
    } catch (error) {
      console.error("Gagal mengupdate deskripsi:", error.message);
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
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default UpdatePostForm;
