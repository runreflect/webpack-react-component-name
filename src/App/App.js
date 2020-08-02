import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "todomvc-app-css/index.css";

import Footer from "../components/Footer";
import TodoList from "../containers/TodoList";
import CustomizedText from "../components/Text";

export default function App() {
  return (
    <HashRouter>
      <CustomizedText />
      <React.Fragment>
        <div className="todoapp">
          <Route path="/:filter?" component={TodoList} />
        </div>
        <Footer />
      </React.Fragment>
    </HashRouter>
  );
}
