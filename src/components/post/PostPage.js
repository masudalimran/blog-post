import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/posts";

// import Style
import "../../style/postsStyle.css";

// import context
import DataContext from "../../context/DataContext";

export default function PostPage() {
  // Use Context
  const { posts, setPosts, navigate } = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  // function
  // TODO Handle Delete
  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);
    try {
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="EditButton">Edit Post</button>
            </Link>
            <button
              className="DeleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
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
