import React from "react";
import { Link } from "react-router-dom";
import "../../style/postsStyle.css";

export default function Post({ post }) {
  return (
    <article className="post">
      <h2>
        <Link className="postTitle" to={`/post/${post.id}`}>
          {post.title}
        </Link>
      </h2>
      <p className="postDate">{post.dateTime}</p>
      <p className="postBody">
        {post.body.length <= 150 ? post.body : `${post.body.slice(0, 150)}... `}
        <span>
          <Link to={`/post/${post.id}`}>
            <button className="readMore">Read More</button>
          </Link>
        </span>
      </p>
    </article>
  );
}
