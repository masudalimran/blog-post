import { createContext, useState, useEffect } from "react";
// Import Axios
import api from "../api/posts";

// Custom Hooks
import useAxiosFetch from "../hooks/useAxiosFetch";

// impost from librarys
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // Use States
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  // Edit posts
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostBody, setEditPostBody] = useState("");

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

  // Functions
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
      history.push("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
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
      history.push("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  // TODO Handle Delete
  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);
    try {
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      history.push("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        handleSubmit,
        handleDelete,
        handleEdit,
        editPostTitle,
        setEditPostTitle,
        editPostBody,
        setEditPostBody,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
