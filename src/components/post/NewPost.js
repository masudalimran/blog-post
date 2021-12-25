import React, { useState, useEffect, useContext } from "react";
import api from "../../api/posts";

// import context
import DataContext from "../../context/DataContext";

export default function NewPost() {
  // Use context
  const { posts, setPosts, navigate, format } = useContext(DataContext);

  // Use States
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [titleCount, setTitleCount] = useState(0);
  const [titleNotValid, setTitleNotValid] = useState(false);

  const [wordCount, setWordCount] = useState(0);
  const [postNotValid, setPostNotValid] = useState(false);

  // Use Effects
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

  // Function
  // TODO Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "PPPPp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h1>New Post</h1>
      <form className="newPostForm" onSubmit={handleSubmit}>
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
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
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
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
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
    </main>
  );
}
