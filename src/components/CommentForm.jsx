import React, { useState } from "react";
import api from "../utils/api";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!comment) return;

    try {
      await api.addComment({ postId, comment });
      setComment(""); // Kosongkan input setelah komentar ditambahkan
      if (onCommentAdded) {
        onCommentAdded(comment); // Callback untuk memperbarui daftar komentar
      }
    } catch (error) {
      console.error("Failed to add comment:", error.message);
    }
  };

  return (
    <form onSubmit={handleAddComment}>
      <textarea
        className="form-control mt-2"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="btn btn-success mt-2">
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
