import { useState, type ReactElement } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"
import DrawerMainPage from "~contents/pages/drawer-main-page"
import type { Router } from "~contents/utils/router"


export default function Drawer({ onCloseEvent }: { onCloseEvent: () => void }) {
  const [fadeInAnimation, setFadeInAnimation] = useState(true)
  const onClose = () => {
    // fade out animation
    setFadeInAnimation(false);
    setTimeout(() => onCloseEvent(), 300); // same with animation css
  }

  const [routes, setRoutes] = useState([])

  const router: Router = {
    prevPage: () => {
      routes.pop()
      setRoutes(routes)
    },
    nextPage: (page: ReactElement) => {
      routes.push(page)
      setRoutes(routes)
    }
  }

  return (
    <div className="tutor-w-full">
      <div
        className="tutor-fixed tutor-inset-0 tutor-z-[51] tutor-bg-[black]/60 tutor-px-4 tutor-transition-[display]"
        onClick={onClose}
      />
      <div className={`tutor-fixed tutor-bottom-0 tutor-top-0 tutor-z-[51] tutor-right-0
        tutor-p-0 tutor-w-full sm:tutor-w-3/5 md:tutor-w-96 lg:tutor-w-96 ${fadeInAnimation ? "slide-in-right" : "slide-out-right"}
        tutor-bg-white tutor-shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] tutor-dark:bg-[#0e1726] tutor-overflow-y-scroll`}>
        {routes.length == 0 ? <DrawerMainPage onClose={onClose} router={router} /> : routes[routes.length - 1]}
      </div>
    </div >
  )
}
