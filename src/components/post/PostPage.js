import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PostPage({ posts, handleDelete }) {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="EditButton">EditPost</button>
            </Link>
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>Well, That is dissapointing</p>
            <button style={{ backgroundColor: "black" }}>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Visit Home Page
              </Link>
            </button>
          </>
        )}
      </article>
    </main>
  );
}
