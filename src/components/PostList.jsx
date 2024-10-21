import React, { useEffect, useState } from "react";
import api from "../utils/api"; // Import API untuk mengambil data postingan dan add like
import { Link } from "react-router-dom"; // Import Link untuk navigasi ke detail postingan

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await api.getAllPosts(1);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Gagal mengambil data postingan:", error.message);
      }
    };
    fetchPosts();
  }, []);

  // Fungsi untuk menambahkan like pada post
  const handleLike = async (postId, isLiked) => {
    try {
      const likeStatus = isLiked ? 0 : 1; // 1 untuk like, 0 untuk unlike
      await api.addLike({ postId, like: likeStatus });
      alert(`Like ${isLiked ? "dihapus" : "ditambahkan"}!`);

      // Optional: refresh the post list after like/unlike
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, isLiked: !isLiked } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Gagal mengubah status like:", error.message);
    }
  };

  return (
    <div>
      <h3>All Posts</h3>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card mt-2">
            <div className="card-body">
              <img src={post.cover} alt="Post cover" width="100" />
              <p>{post.description}</p>
              <p>
                <strong>Created at:</strong> {post.created_at}
              </p>
              <button
                onClick={() => handleLike(post.id, post.isLiked)}
                className="btn btn-primary"
              >
                {post.isLiked ? "Unlike" : "Like"}
              </button>
              <Link to={`/posts/${post.id}`} className="btn btn-link">
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
