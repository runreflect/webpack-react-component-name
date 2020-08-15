import uuid from './uuid'

uuid()

const LazyRoot = React.lazy(() => import('./exporting'));

useExports()

function useExports(a1, a2, a3, a4, a5) {
  LazyRoot
}

import React from "react"
import { HashRouter } from "react-router-dom"
import ShortcutsModal from "./shortcuts-modal"

export default function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <ShortcutsModal></ShortcutsModal>
      </React.Fragment>
    </HashRouter>
  )
}
