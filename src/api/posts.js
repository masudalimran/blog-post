import axios from "axios";

export default axios.create({
  baseURL: "https://blog-post-json-server.herokuapp.com/",
});
