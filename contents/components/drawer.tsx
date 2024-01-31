import { useState } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"


export default function Drawer({ className, onClick }: { className: string, onClick: () => void }) {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  const [currentUrl, setCurrentUrl] = useState(window.location.host)
  // console.log(window.location.origin)
  // console.log(window.location.pathname)

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]

  return (
    <div className={className}>
      <button onClick={() => { onClick() }}> Close!!!! </button>
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
  )
}
