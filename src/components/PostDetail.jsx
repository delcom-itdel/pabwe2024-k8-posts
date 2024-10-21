import React, { useEffect, useState } from "react";
import api from "../utils/api";

function PostDetail({ id }) {
  const [post, setPost] = useState(null); // State untuk menyimpan detail posting
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        console.log("Fetching post with ID:", id); // Debug: melihat apakah postId benar
        const fetchedPost = await api.getPostDetail(id);
        console.log("Fetched Post Data:", fetchedPost); // Debug: melihat data yang diterima
        setPost(fetchedPost); // Simpan data postingan ke state
        setLoading(false); // Set loading ke false setelah data diterima
      } catch (error) {
        console.error("Gagal mengambil detail postingan:", error.message);
        setLoading(false); // Jika ada error, hentikan loading
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
      <img src={post.cover} alt="Post cover" />
      <h2>{post.description}</h2>
      <p>Created at: {post.created_at}</p>
    </div>
  );
}

export default PostDetail;
