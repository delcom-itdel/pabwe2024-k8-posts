import React from "react";
import api from "../utils/api";

const DeletePostButton = ({ postId, onDeleteSuccess }) => {
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.deletePost(postId);
      if (onDeleteSuccess) {
        onDeleteSuccess(); // Callback setelah berhasil dihapus
      }
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error.message);
    }
  };

  return (
    <button onClick={handleDeletePost} className="btn btn-danger mt-2">
      Delete Post
    </button>
  );
};

export default DeletePostButton;
