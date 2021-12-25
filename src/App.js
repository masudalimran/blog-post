// Import CSS
import "./App.css";

// Import Components
import Home from "./components/Home";
import About from "./components/About";
import NewPost from "./components/post/NewPost";
import EditPost from "./components/post/EditPost";
import PostPage from "./components/post/PostPage";
import Missing from "./components/404/Missing";
import Layout from "./components/Layout";

// impost from librarys
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
