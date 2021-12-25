import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

// import Context
import { DataProvider } from "../context/DataContext";

const Layout = () => {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Blog" />
        <Nav />
        <Outlet />
        <Footer />
      </DataProvider>
    </div>
  );
};

export default Layout;
