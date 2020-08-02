import React from "react"
import { HashRouter } from "react-router-dom"

import ExampleDiv from "./ExampleDiv"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <ExampleDiv></ExampleDiv>
      </React.Fragment>
    </HashRouter>
  )
}