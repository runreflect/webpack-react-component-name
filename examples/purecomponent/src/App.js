import React from "react"
import { HashRouter } from "react-router-dom"

import UIButton from "./UIButton"
import PureVariantOne from "./PureVariantOne"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <UIButton></UIButton>
        <PureVariantOne></PureVariantOne>
      </React.Fragment>
    </HashRouter>
  )
}
