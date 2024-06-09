// import 'global';
import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
