import cssText from "data-text:~/contents/style.css"

const DRAWER_ID = "tutor-app-drawer"

const Button = ({ onClick, className }: { onClick: () => void, className: string }) => {
  return (
    <a className={`${className} tutor-cursor-pointer 
    tutor-bg-primary/75 hover:tutor-bg-primary/100
    hover:tutor-w-14 tutor-transition tutor-duration-300 tutor-ease-in-out
    tutor-flex tutor-items-center tutor-justify-center
    tutor-rounded-tl-full tutor-rounded-bl-full`}
      onClick={onClick}>

      <svg xmlns="http://www.w3.org/2000/svg"
        stroke="white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        className="tutor-w-5 tutor-h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>

    </a>
  )
}

export default Button
