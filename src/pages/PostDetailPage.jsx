import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import UpdatePostForm from "../components/UpdatePostForm";
import ChangeCoverForm from "../components/ChangeCoverForm";
import LikePostButton from "../components/LikePost";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const PostDetailPage = () => {
  const { id } = useParams(); // Mengambil postId dari URL
  const [post, setPost] = useState(null); // Menyimpan data post
  const [loading, setLoading] = useState(true); // State loading
  const [isEditing, setIsEditing] = useState(false); // State untuk toggle edit deskripsi
  const [isEditingCover, setIsEditingCover] = useState(false); // State untuk toggle edit cover

  // Fetch post detail saat komponen mount
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const fetchedPost = await api.getPostDetail(id); // Ambil detail post dari API
        setPost(fetchedPost); // Set ke state post
        setLoading(false); // Hentikan loading
      } catch (error) {
        console.error("Failed to fetch post detail:", error.message);
        setLoading(false); // Hentikan loading jika gagal
      }
    };
    fetchPostDetail();
  }, [id]);

  // Jika loading masih berlangsung, tampilkan pesan loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // Jika tidak ada post ditemukan
  if (!post) {
    return <p>No post found.</p>;
  }

  // Fungsi untuk update deskripsi
  const handleUpdateDescription = (newDescription) => {
    setPost((prevPost) => ({
      ...prevPost,
      description: newDescription, // Update deskripsi di local state
    }));
    setIsEditing(false); // Matikan mode edit setelah update berhasil
  };

  // Fungsi untuk update cover
  const handleUpdateCover = (newCoverUrl) => {
    setPost((prevPost) => ({
      ...prevPost,
      cover: newCoverUrl, // Update cover di local state
    }));
    setIsEditingCover(false); // Matikan mode edit cover setelah update berhasil
  };

  // Fungsi untuk menambahkan komentar
  const handleCommentAdded = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, { comment: newComment }], // Tambah komentar ke list
    }));
  };

  const handleDeleteComment = async (commentIndex) => {
    try {
      // Hapus komentar melalui API (tambahkan endpoint API sesuai kebutuhan)
      await api.deleteComment(post.id, commentIndex);

      // Update state setelah komentar dihapus
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter(
          (_, index) => index !== commentIndex
        ),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Post Detail</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <img src={post.cover} alt="Post cover" className="img-fluid" />
          <p>{post.description}</p>

          {/* Tombol untuk mengaktifkan atau menonaktifkan mode edit deskripsi */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-warning mt-3"
          >
            {isEditing ? "Cancel Edit" : "Edit Post"}
          </button>

          {/* Tampilkan form edit deskripsi jika isEditing true */}
          {isEditing && (
            <UpdatePostForm
              id={post.id}
              currentDescription={post.description}
              onUpdateDescription={handleUpdateDescription}
            />
          )}

          {/* Change Cover Button */}
          <button
            onClick={() => setIsEditingCover(!isEditingCover)}
            className="btn btn-secondary mt-3"
          >
            {isEditingCover ? "Cancel Change Cover" : "Change Cover"}
          </button>

          {/* Change Cover Form */}
          {isEditingCover && (
            <ChangeCoverForm id={post.id} onUpdateCover={handleUpdateCover} />
          )}

          {/* Daftar Komentar */}
          <CommentList
            comments={post.comments}
            onDeleteComment={handleDeleteComment} // Kirim fungsi delete ke CommentList
          />

          {/* Form Tambah Komentar */}
          <CommentForm id={post.id} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
