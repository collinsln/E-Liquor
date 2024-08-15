import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "react-router-dom";
//import { MoonIcon, SunIcon } from "@chakra-ui/icons";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <div className="marquee-container">
        <marquee behavior="scroll">
          Cheers to finding your favorite spirits at The Liquor Cave! Welcome to
          a world of exceptional tastes and delightful discoveries. Let's raise
          a glass to good times ahead!
        </marquee>
      </div>
    </ChakraProvider>
  </React.StrictMode>
);
