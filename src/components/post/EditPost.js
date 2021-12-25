import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

// Import Axios
import api from "../../api/posts";

// Import Context
import DataContext from "../../context/DataContext";

export default function EditPost() {
  // Use Context
  const { format, navigate, posts, setPosts } = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  // Use States
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostBody, setEditPostBody] = useState("");

  const [titleCount, setTitleCount] = useState(0);
  const [titleNotValid, setTitleNotValid] = useState(false);

  const [wordCount, setWordCount] = useState(0);
  const [postNotValid, setPostNotValid] = useState(false);

  // Use Effects
  useEffect(() => {
    if (post) {
      setEditPostTitle(post.title);
      setEditPostBody(post.body);
      setTitleCount(post.title.length);
      setWordCount(post.body.length);
    }
  }, [post, setEditPostTitle, setEditPostBody]);
  useEffect(() => {
    if (titleCount > 60) {
      setTitleNotValid(true);
    } else {
      setTitleNotValid(false);
    }
  }, [titleCount]);

  useEffect(() => {
    if (wordCount > 1000) {
      setPostNotValid(true);
    } else {
      setPostNotValid(false);
    }
  }, [wordCount]);

  // Functions
  // TODO Hanlde Edit
  const handleEdit = async (e, id) => {
    e.preventDefault();
    const dateTime = format(new Date(), "PPPPp");
    const updatedPost = {
      id,
      title: editPostTitle,
      dateTime,
      body: editPostBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditPostTitle("");
      setEditPostBody("");
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className="NewPost">
      {editPostTitle ? (
        <>
          <h1>Update Post</h1>
          <form
            className="newPostForm"
            onSubmit={(e) => handleEdit(e, post.id)}
          >
            <label htmlFor="postTitle">
              Title:{" "}
              {titleCount > 60 ? (
                <span style={{ color: "red" }}>
                  {titleCount}
                  <span style={{ color: "black" }}>/60</span>
                  <p>upto 60 Characters</p>
                </span>
              ) : (
                <span>{titleCount}/60</span>
              )}
            </label>
            <input
              id="postTitle"
              type="text"
              title="Please Type Title For the Post"
              required
              value={editPostTitle}
              onChange={(e) => {
                setEditPostTitle(e.target.value);
                setTitleCount(e.target.value.length);
              }}
            />

            <label htmlFor="postBody">
              Post:{" "}
              {wordCount > 1000 ? (
                <span style={{ color: "red" }}>
                  {wordCount}
                  <span style={{ color: "black" }}>/1000</span>
                  <p>upto 1000 Characters</p>
                </span>
              ) : (
                <span>{wordCount}/1000</span>
              )}
            </label>
            <textarea
              id="postBody"
              title="Please Type the Post"
              required
              value={editPostBody}
              onChange={(e) => {
                setEditPostBody(e.target.value);
                setWordCount(e.target.value.length);
              }}
            />
            <button
              style={{ backgroundColor: "#4BB543" }}
              type="submit"
              disabled={titleNotValid || postNotValid}
            >
              Submit
            </button>
          </form>
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
    </main>
  );
}
