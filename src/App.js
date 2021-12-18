// Import CSS
import "./App.css";

// Import Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import NewPost from "./components/post/NewPost";
import EditPost from "./components/post/EditPost";
import PostPage from "./components/post/PostPage";
import Missing from "./components/404/Missing";

// Import Axios
import api from "./api/posts";

// Custom Hooks
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

// impost from librarys
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
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
  const { width } = useWindowSize();
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
    <div className="App">
      <Header title="Blog" width={width} />
      <Nav search={search} setSearch={setSearch} width={width} />

      {/* Routes */}
      <Switch>
        <Route exact path="/">
          <Home
            posts={searchResults}
            fetchError={fetchError}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/post">
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editPostTitle={editPostTitle}
            setEditPostTitle={setEditPostTitle}
            editPostBody={editPostBody}
            setEditPostBody={setEditPostBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      {/* Routes */}

      <Footer />
    </div>
  );
}

export default App;
