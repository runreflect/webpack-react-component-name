import React from 'react';

import {
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import List from './components/List';
import Detail from './components/Detail';

function App() {
  return (
    <div id="react-main-app">
      <div className="container">
        <h1><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" width="50" height="50" alt="React logo"/> React App</h1>
        <hr/>
        <p>
            This is the React section page.
            This section is displayed when url starts with "/react" prefix.
        </p>
        <nav id="links">
          <NavLink to="/" activeClassName="active" exact="true">List</NavLink>
          <NavLink to="/detail" activeClassName="active" exact="true">Detail</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/detail" component={Detail} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
