import React, { useContext } from "react";

// import Context
import DataContext from "../context/DataContext";

export default function Footer() {
  const { posts } = useContext(DataContext);

  return (
    <footer className="Footer">
      <p>
        {posts.length} Blog {posts.length < 2 ? "Post" : "Posts"}
      </p>
    </footer>
  );
}
