import React from "react"
import { Router } from "@reach/router"
import StoryPage from "../components/story/StoryPage"

const App = () => {
  return (
    <div>
        <Router basepath="/">
        <StoryPage path="/story/*"/>
      </Router>
    </div>
  )
}

export default App