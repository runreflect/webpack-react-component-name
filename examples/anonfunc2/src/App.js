import React from "react"
import { HashRouter } from "react-router-dom"

import Badge from "./Badge"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Badge></Badge>
      </React.Fragment>
    </HashRouter>
  )
}
