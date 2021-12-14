import React from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.dateTime}</p>
      </Link>
      <p className="postBody">
        {post.body.length <= 110 ? post.body : `${post.body.slice(0, 110)}...`}
      </p>
    </article>
  );
}
