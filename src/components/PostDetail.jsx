import React, { useEffect, useState } from "react";
import api from "../utils/api";

function PostDetail({ id }) {
  const [post, setPost] = useState(null); // State untuk menyimpan detail posting
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const fetchedPost = await api.getPostDetail(id);
        console.log("Fetched Post:", fetchedPost); // Debug response dari API
        setPost(fetchedPost);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch post detail:", error.message);
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>No post found.</p>; // Jika post tidak ada, tampilkan pesan error
  }

  return (
    <div>
      <img src={post.description} alt="Post cover" />
      <h2>{post.description}</h2>
      <p>like: {post.like}</p>
      <p>Created at: {post.created_at}</p>
    </div>
  );
}

export default PostDetail;
