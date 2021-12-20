import React, { useContext } from "react";
import Feed from "./post/Feed";

// import Context
import DataContext from "../context/DataContext";

export default function Home() {
  // Use Context
  const { searchResults, fetchError, isLoading } = useContext(DataContext);

  return (
    <main className="Home">
      {isLoading && <p>Loading Posts........</p>}
      {!isLoading && fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (searchResults.length ? (
          <Feed />
        ) : (
          <p style={{ marginTop: "2rem" }}>No Posts To Display</p>
        ))}
    </main>
  );
}
