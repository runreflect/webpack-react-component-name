import React from "react"
import { HashRouter } from "react-router-dom"

import Foo from "./Foo"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Foo></Foo>
      </React.Fragment>
    </HashRouter>
  )
}
