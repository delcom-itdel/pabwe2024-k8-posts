import React from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail"; // Komponen PostDetail

const PostDetailPage = () => {
  const { id } = useParams(); // Ambil id dari URL

  return (
    <div>
      <h1>Post Detail</h1>
      <PostDetail id={id} />{" "}
      {/* Berikan id sebagai props ke komponen PostDetail */}
    </div>
  );
};

export default PostDetailPage;
