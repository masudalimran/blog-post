import React from "react";
import Feed from "./post/Feed";

export default function Home({ posts }) {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No Posts To Display</p>
      )}
    </main>
  );
}
