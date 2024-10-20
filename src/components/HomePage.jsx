import React from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { usePostContext } from "../states/postContext";

function HomePage() {
  const { posts } = usePostContext();

  return (
    <div className="home-page">
      <h2>Home</h2>
      <PostForm />
      <PostList posts={posts} />
    </div>
  );
}

export default HomePage;
