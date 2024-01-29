import cssText from "data-text:~src/style.css"

const DRAWER_ID = "tutor-app-drawer"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const CustomButton = () => {
  return (
    <a className="tutor-cursor-pointer 
    tutor-z-50 tutor-fixed tutor-top-32 tutor-right-0 tutor-w-12 tutor-h-10 
    tutor-bg-[#ef5350]/75 
    tutor-flex tutor-items-center tutor-justify-center
    tutor-rounded-tl-full tutor-rounded-bl-full"
      onClick={() => {
        let iframe = document.getElementById(DRAWER_ID)
        if (iframe === null || iframe === undefined) {
          const iframe = document.createElement("iframe")
          iframe.id = DRAWER_ID
          iframe.src = chrome.runtime.getURL("/tabs/drawer.html")
          iframe.name = "drawer"
          iframe.style.position = "fixed"
          iframe.style.top = "100px"
          iframe.style.right = "0"
          iframe.style.display = "block"
          iframe.style.backgroundColor = "pink"
          document.body.appendChild(iframe)
        } else {
          const display = iframe.style.display
          console.log("???", display)
          iframe.style.display = display == "block" ? "none" : "block"
        }
      }}>

      <svg xmlns="http://www.w3.org/2000/svg"
        stroke="white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
        className="tutor-w-5 tutor-h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>


    </a>
  )
}

export default CustomButton
