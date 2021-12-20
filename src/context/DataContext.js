//  TODO DATA CONTEXT
import { createContext, useState, useEffect } from "react";

// Custom Hooks
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";

// impost from librarys
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

//  TODO DATA CONTEXT
const DataContext = createContext({});

//  TODO DATA CONTEXT
export const DataProvider = ({ children }) => {
  // Use States
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const { width } = useWindowSize();

  const history = useHistory();

  // From Custom Hooks
  const { data, fetchError, isLoading } = useAxiosFetch("/posts");

  // Use Effects
  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        width,
        history,
        format,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

//  TODO DATA CONTEXT
export default DataContext;
