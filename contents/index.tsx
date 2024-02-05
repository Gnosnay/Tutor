import cssText from "data-text:~/contents/style.css"
import { useState } from 'react'
import Button from "./components/button"
import Drawer from "./components/drawer"

const DRAWER_ID = "tutor-app-drawer"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const App = () => {
  const [isDrawerShown, setIsDrawerShown] = useState<boolean>(false);
  console.log("1111")

  return (
    isDrawerShown
      ? <Drawer onClick={() => { setIsDrawerShown(false) }}
      />
      : <Button
        className="tutor-z-50 tutor-fixed tutor-top-32 tutor-right-0 tutor-w-12 tutor-h-10"
        onClick={() => { setIsDrawerShown(true) }}
      />
  )
}

export default App
