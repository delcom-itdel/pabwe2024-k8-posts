import React, { useState } from 'react';
import api from '../api/api';

const ChangeCoverForm = ({ postId }) => {
  const [cover, setCover] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangeCover = async (event) => {
    event.preventDefault();
    try {
      await api.changeCoverPost({ postId, cover });
      setSuccessMessage('Cover berhasil diubah!');
    } catch (error) {
      console.error("Gagal mengubah cover:", error.message);
    }
  };

  return (
    <form onSubmit={handleChangeCover}>
      <div>
        <label>New Cover Image:</label>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
      </div>
      <button type="submit">Change Cover</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default ChangeCoverForm;
