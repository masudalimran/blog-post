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

// impost from librarys
import { Route, Switch } from "react-router-dom";

// import Context
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Blog" />
        <Nav />
        {/* Routes */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post" component={NewPost} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
        {/* Routes */}
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
