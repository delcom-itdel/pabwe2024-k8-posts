import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import UpdatePostForm from "./UpdatePostForm"; // Import UpdatePostForm
import "../styles/style.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [editingid, setEditingPostId] = useState(null); // State untuk menyimpan ID posting yang sedang diedit

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await api.getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Gagal mengambil data postingan:", error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id, liked) => {
    try {
      if (liked) {
        await api.addLike({ postId: id, like: 0 });
      } else {
        await api.addLike({ postId: id, like: 1 });
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                likes: liked ? post.likes - 1 : post.likes + 1,
                liked: !liked,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Gagal mengubah like:", error.message);
    }
  };

  const handleAddComment = async (id) => {
    if (!newComments[id]) return; // Pastikan ada komentar yang ingin ditambahkan
    try {
      await api.addComment({ postId: id, comment: newComments[id] });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                comments: [...post.comments, { comment: newComments[id] }],
              }
            : post
        )
      );
      setNewComments({ ...newComments, [id]: "" });
    } catch (error) {
      console.error("Gagal menambahkan komentar:", error.message);
    }
  };

  const handleCommentChange = (id, commentText) => {
    setNewComments({
      ...newComments,
      [id]: commentText,
    });
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Gagal menghapus postingan:", error.message);
    }
  };

  const handleEditPost = (id) => {
    setEditingPostId(id); // Atur postId yang sedang diedit
  };

  return (
    <div className="post-list-container">
      {posts.map((post) => (
        <div key={post.id} className="card mt-2">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <img src={post.cover} alt="Post cover" className="img-fluid" />

            {/* Link ke halaman detail ketika deskripsi ditekan */}
            <Link to={`/posts/${post.id}`} className="post-description-link">
              <p className="post-description">{post.description}</p>
            </Link>

            {/* Tombol Delete di bawah gambar */}
            <button
              onClick={() => handleDeletePost(post.id)}
              className="btn btn-danger mt-2"
            >
              Delete Post
            </button>
            {/* Tampilkan form UpdatePostForm jika postId sedang diedit */}
            {editingid === post.id && (
              <div className="mt-3">
                <UpdatePostForm
                  id={post.id}
                  currentDescription={post.description}
                />
              </div>
            )}

            {/* Tombol Like dan jumlah Like */}
            <button
              onClick={() => handleLike(post.id, post.liked)}
              className="btn btn-primary mt-2"
            >
              {post.liked ? "Unlike" : "Like"} ({post.likes})
            </button>

            {/* Bagian komentar */}
            <div className="comments-section mt-4">
              <h6>Comments</h6>
              <ul className="list-group">
                {post.comments.map((comment, index) => (
                  <li key={index} className="list-group-item">
                    {comment.comment}
                  </li>
                ))}
              </ul>

              {/* Form untuk menambah komentar dengan tombol Submit */}
              <textarea
                className="form-control mt-2"
                placeholder="Add a comment"
                value={newComments[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="btn btn-success mt-2"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
