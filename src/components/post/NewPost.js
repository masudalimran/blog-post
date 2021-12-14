import React, { useState, useEffect } from "react";

export default function NewPost({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) {
  // Use States
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
    if (wordCount > 500) {
      setPostNotValid(true);
    } else {
      setPostNotValid(false);
    }
  }, [wordCount]);

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
          {wordCount > 500 ? (
            <span style={{ color: "red" }}>
              {wordCount}
              <span style={{ color: "black" }}>/500</span>
              <p>upto 500 Characters</p>
            </span>
          ) : (
            <span>{wordCount}/500</span>
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
