import { useState } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"


export default function Drawer({ onClick }: { onClick: () => void }) {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  const [currentUrl, setCurrentUrl] = useState(window.location.host)
  const [fadeInAnimation, setFadeInAnimation] = useState(true)
  const onClose = () => {
    // fade out animation
    setFadeInAnimation(false);
    setTimeout(() => {
      onClick()
    }, 300); // same with animation css
  }
  // TODO
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "origin": window.location.origin,
    "path_name": window.location.pathname
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8000/post", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  // TODO

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]

  return (
    <div>
      <div
        className="tutor-fixed tutor-inset-0 tutor-z-[51] tutor-bg-[black]/60 tutor-px-4 tutor-transition-[display]"
        onClick={onClose}
      />
      <div className={`tutor-fixed tutor-bottom-0 tutor-top-0 tutor-z-[51] tutor-right-0
        tutor-w-full tutor-max-w-[400px] ${fadeInAnimation ? "slide-in-right" : "slide-out-right"}
        tutor-bg-white tutor-p-4 tutor-shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] tutor-dark:bg-[#0e1726]`}>
        <button onClick={onClose}> Close!!!! </button>
        <h3 className="tutor-font-bold">The Url: </h3>
        <p className="">{currentUrl}</p>
        <h3>Target document link: </h3>
        <p>The link to {currentUrl}</p>
        <h3>Can update via following editor: </h3>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            style={{
              border: "1px solid #333",
              padding: 16
            }}
          />
        </Slate>
      </div>
    </div >
  )
}
