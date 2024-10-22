import React, { useState, useEffect } from "react";
import api from "../utils/api";

const CommentForm = ({ id, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!comment) return;

    try {
      console.log("ID post yang akan dikomentari:", id);
      await api.addComment({ id, comment });
      console.log("berhasil menambah comment");

      onCommentAdded(comment);
      setComment(""); // Kosongkan input setelah komentar ditambahkan
      setSubmitted(true); // Update state to trigger the alert
    } catch (error) {
      console.error("Failed to add comment:", error.message);
    }
  };

  useEffect(() => {
    if (submitted) {
      alert("Berhasil menambahkan komentar");
      setSubmitted(false); // Reset submitted state
    }
  }, [submitted]);

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
