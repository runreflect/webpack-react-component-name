import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "todomvc-app-css/index.css";

import ExampleDiv from "../components/ExampleDiv";
import Footer from "../components/Footer";
import TodoList from "../containers/TodoList";

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <div className="todoapp">
          <Route path="/:filter?" component={TodoList} />
        </div>
        <ExampleDiv></ExampleDiv>
        <Footer />
      </React.Fragment>
    </HashRouter>
  );
}

// App.displayName = 'AppCustomTwo'
