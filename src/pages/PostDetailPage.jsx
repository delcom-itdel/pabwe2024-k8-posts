import React from "react";
import PostDetail from "../components/PostDetail";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams(); // Ambil postId dari URL
  console.log("Post ID from URL:", id); // Debug: melihat apakah postId benar

  return (
    <div className="container mt-4">
      <h1>Post Detail</h1>
      <PostDetail postId={id} />
    </div>
  );
};

export default PostDetailPage;
