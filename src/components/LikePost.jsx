import React, { useState, useEffect } from "react";
import api from "../utils/api";

const LikePostButton = ({ postId, initialLikes, initialLiked }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const handleLikePost = async () => {
    try {
      const likeStatus = liked ? 0 : 1;
      await api.addLike({ postId, like: likeStatus });
      setLiked(!liked); // Toggle like state
      setLikes(likes + (liked ? -1 : 1)); // Update jumlah like
    } catch (error) {
      console.error("Failed to like/unlike post:", error.message);
    }
  };

  return (
    <button onClick={handleLikePost} className="btn btn-primary mt-2">
      {liked ? "Unlike" : "Like"} ({likes})
    </button>
  );
};

export default LikePostButton;
