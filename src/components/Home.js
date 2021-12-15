import React from "react";
import Feed from "./post/Feed";

export default function Home({ posts, fetchError, isLoading }) {
  return (
    <main className="Home">
      {isLoading && <p>Loading Posts........</p>}
      {!isLoading && fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No Posts To Display</p>
        ))}
    </main>
  );
}
