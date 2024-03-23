import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import uniqid from "uniqid"

const ChatBubble = ({
  name,
  content,
  isPrimary
}: {
  name: string
  content: string
  isPrimary?: boolean
}) => {
  return (
    <div className="tutor-chat tutor-chat-start">
      <div className="tutor-chat-header">{name}</div>
      <div
        className={`tutor-chat-bubble tutor-whitespace-normal ${
          isPrimary && "tutor-chat-bubble-primary"
        }`}>
        {content}
      </div>
    </div>
  )
}

export const ChatBox = () => {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const messagesEndRef = useRef(null)

  // keep scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = () => {
    if (!text) return
    setMessages([
      ...messages,
      <ChatBubble key={uniqid()} name="You" content={text} />
    ])
    setTimeout(() => {
      setMessages([
        ...messages,
        <ChatBubble key={uniqid()} name="You" content={text} />,
        <ChatBubble
          key={uniqid()}
          name="Tutor AI"
          content={`You Said: ${text}`}
          isPrimary={true}
        />
      ])
    }, 500)
    // clear textarea
    setText("")
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      // keyboard listenning
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        handleSubmit()
        // prevent default behavior like change line
        event.preventDefault()
      }
    }
    // add keyboard listener
    document.addEventListener("keydown", handleKeyDown)
    scrollToBottom()
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [text, messages])

  return (
    <div>
      {messages}
      <div ref={messagesEndRef} />
      <div className="tutor-relative tutor-mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="tutor-textarea tutor-textarea-primary tutor-w-full"
          placeholder="Ask anything about the usage of this page."
        />
        <a
          className="tutor-cursor-pointer tutor-absolute tutor-bottom-4 tutor-right-2"
          onClick={handleSubmit}>
          <PaperAirplaneIcon className="tutor-w-6 tutor-h-6 tutor-stroke-[oklch(var(--p))]" />
        </a>
      </div>
    </div>
  )
}
