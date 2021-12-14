// Import CSS
import "./App.css";
// Import Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import NewPost from "./components/post/NewPost";
import PostPage from "./components/post/PostPage";
import Missing from "./components/404/Missing";
// impost from librarys
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
  // Use States
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "React JS",
      dateTime: "July 10, 2021 11:17:36 PM",
      body: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[3] for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.[7]",
    },
    {
      id: 2,
      title: "Wix",
      dateTime: "August 10, 2022 11:17:36 PM",
      body: "Wix.com Ltd. (Hebrew: וויקס.קום‎) is an Israeli software company that provides cloud-based web development services. It allows users to create HTML5 websites and mobile sites through the use of online drag and drop tools.[4] Along with its headquarters and other offices in Israel, Wix also has offices in Brazil, Canada, Germany, India, Ireland, Lithuania, the United States, and Ukraine.[5] Users can add social plug-ins, e-commerce, online marketing, contact forms, e-mail marketing, and community forums to their web sites using a variety of Wix-developed and third-party applications.[6][7] The Wix website builder is built on a freemium business model, earning its revenues through premium upgrades.[8]",
    },
    {
      id: 3,
      title: "Shopify",
      dateTime: "May 10, 2021 01:17:36 PM",
      body: "Shopify was founded in 2006 by Tobias Lütke and Scott Lake after attempting to open Snowdevil, an online store for snowboarding equipment. Dissatisfied with the existing e-commerce products on the market, Lütke, a computer programmer by trade, instead built his own.[12][13][14] Lütke used the open source web application framework Ruby on Rails to build Snowdevil's online store, and launched it after two months of development.[15][16] The Snowdevil founders launched the platform as Shopify in June 2006.[15] Shopify created an open-source template language called Liquid, which is written in Ruby and used since 2006. In June 2009, Shopify launched an application programming interface (API) platform and App Store. The API allows developers to create applications for Shopify online stores and then sell them on the Shopify App Store.[18]",
    },
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  // Use Effects
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  // Functions
  // TODO Handle Delete
  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    history.push("/");
  };
  // TODO Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "PPPPp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    history.push("/");
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
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
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
