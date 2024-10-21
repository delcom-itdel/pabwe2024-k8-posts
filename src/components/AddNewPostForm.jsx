import React, { useState } from 'react';
import api from '../utils/api';

const AddNewPostForm = () => {
  const [cover, setCover] = useState(null);
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
