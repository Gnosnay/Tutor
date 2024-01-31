import { useState } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"

import "./style.css"

function getCurrentPageUrl(setUrl) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url
    setUrl(url)
  })
}

export default function DeltaFlyerPage() {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  const [currentUrl, setCurrentUrl] = useState("")
  getCurrentPageUrl(setCurrentUrl)

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]

  return (
    <div>
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
