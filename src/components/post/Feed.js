import React, { useContext } from "react";
import Post from "./Post";

// import Context
import DataContext from "../../context/DataContext";

export default function Feed() {
  const { searchResults } = useContext(DataContext);
  return (
    <>
      {searchResults.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
