import React from "react"
import { HashRouter } from "react-router-dom"

import Dialog from "./Dialog"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Dialog></Dialog>
      </React.Fragment>
    </HashRouter>
  )
}
