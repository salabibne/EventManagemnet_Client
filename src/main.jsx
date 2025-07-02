// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { AuthProvider } from "./context/AuthContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
 
//     <AuthProvider>
//       <App />
//     </AuthProvider>
  
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the App component with BrowserRouter and AuthProvider
  <HashRouter> 
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
