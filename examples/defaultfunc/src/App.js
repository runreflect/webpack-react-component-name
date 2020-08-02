import React from "react"
import { HashRouter } from "react-router-dom"

import Footer from "./Footer"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Footer></Footer>
      </React.Fragment>
    </HashRouter>
  )
}
