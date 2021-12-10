import React from "react"
import { HashRouter } from "react-router-dom"

import Button from "./Button"
import MemoizedButton from "./MemoizedButton"
import MemoizedButton2 from "./MemoizedButton2"
import MemoizedButton3 from "./MemoizedButton3"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Button></Button>
        <MemoizedButton></MemoizedButton>
        <MemoizedButton2></MemoizedButton2>
        <MemoizedButton3></MemoizedButton3>
      </React.Fragment>
    </HashRouter>
  )
}
