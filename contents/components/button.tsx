import cssText from "data-text:~/contents/style.css"
import type { ReactElement } from "react"

const DRAWER_ID = "tutor-app-drawer"

const Button = ({ onClick, className, icon }: { onClick: () => void, className: string, icon: ReactElement }) => {
  return (
    <a className={`${className} tutor-cursor-pointer 
    tutor-bg-primary/75 hover:tutor-bg-primary/100
    hover:tutor-w-14 tutor-transition tutor-duration-300 tutor-ease-in-out
    tutor-flex tutor-items-center tutor-justify-center
    tutor-rounded-tl-full tutor-rounded-bl-full`}
      onClick={onClick}>
      {icon}
    </a>
  )
}

export default Button
