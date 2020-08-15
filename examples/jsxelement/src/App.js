import React from "react"
import { HashRouter } from "react-router-dom"

import TextSetting from "./TextSetting"
import AdminTextSetting from "./AdminTextSetting"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <TextSetting></TextSetting>
        <AdminTextSetting></AdminTextSetting>
      </React.Fragment>
    </HashRouter>
  )
}
