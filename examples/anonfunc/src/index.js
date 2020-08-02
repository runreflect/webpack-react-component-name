import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
