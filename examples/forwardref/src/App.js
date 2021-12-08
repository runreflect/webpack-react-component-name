import React from "react"
import { HashRouter } from "react-router-dom"

import Dialog from "./Dialog"
import Dialog2 from "./Dialog2"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Dialog></Dialog>
        <Dialog2></Dialog2>
      </React.Fragment>
    </HashRouter>
  )
}
