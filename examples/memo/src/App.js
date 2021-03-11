import React from "react"
import { HashRouter } from "react-router-dom"

import Button from "./Button"
import MemoizedButton from "./MemoizedButton"
import MemoizedButton2 from "./MemoizedButton2"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Button></Button>
        <MemoizedButton></MemoizedButton>
        <MemoizedButton2></MemoizedButton2>
      </React.Fragment>
    </HashRouter>
  )
}
