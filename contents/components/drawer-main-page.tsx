import { useState, type ReactElement } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"
import type { Router } from "~contents/utils/router"
import { AtSymbolIcon, ClockIcon, DocumentIcon, GlobeAltIcon } from '@heroicons/react/24/outline'


function BadgeBoard({ items }: { items: { title: string, amount: number }[] }) {
  return <div className="tutor-flex tutor-w-full tutor-border tutor-border-[oklch(var(--p))] tutor-p-4 tutor-rounded-box tutor-overflow-x-auto">
    {items.map(item => <div className="tutor-grid tutor-h-12 tutor-flex-grow tutor-place-items-center">
      <h2 className="tutor-font-bold tutor-text-lg tutor-whitespace-nowrap">{item.amount}</h2>
      <p className="tutor-text-sm tutor-whitespace-nowrap">{item.title}</p>
    </div>).reduce((accumulator, currentValue, currentIndex) => {
      if (currentIndex < items.length - 1) {
        return [...accumulator, currentValue, <div className="tutor-divider tutor-divider-horizontal" />];
      } else {
        return [...accumulator, currentValue];
      }
    }, [])}
  </div>
}

function HighlightItems({ items }: { items: { icon: ReactElement, title: string, value: string }[] }) {
  return <div className="tutor-flex tutor-flex-col tutor-py-4 tutor-items-start tutor-justify-center">
    {items.map(item => <div className="tutor-flex tutor-flex-row tutor-w-full">
      <div className="tutor-flex-none tutor-flex tutor-items-center tutor-justify-center tutor-p-4">
        {item.icon}
      </div>
      <div className="tutor-flex-1 tutor-flex tutor-flex-col tutor-items-start tutor-justify-center">
        <h2 className="tutor-font-bold tutor-text-md">{item.title}</h2>
        <p className="tutor-text-sm">{item.value}</p>
      </div>
    </div>)}
  </div>
}


export default function DrawerMainPage({ onClose, router }: { onClose: () => void, router: Router }) {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  const [currentUrl, setCurrentUrl] = useState(window.location.host)
  const [fadeInAnimation, setFadeInAnimation] = useState(true)
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
      <div className="tutor-navbar tutor-px-4 tutor-bg-base-100 tutor-w-full">
        <div className="tutor-flex-1">
          <h2 className="tutor-card-title">Tutor Helper</h2>
        </div>
        <div className="tutor-flex-none">
          <button className="tutor-btn tutor-btn-circle tutor-btn-sm" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="tutor-h-4 tutor-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
      <div className="tutor-w-full tutor-absolute tutor-border-b tutor-border-gray-300"></div>
      <div className="tutor-px-4 tutor-py-2">
        <div className="tutor-card">
          <h2 className="tutor-text-xl tutor-my-4 tutor-font-medium">Infra Center</h2>
          <BadgeBoard items={[
            { 'amount': 4, 'title': 'Notices' },
            { 'amount': 78, 'title': 'Use Cases' },
            { 'amount': 13, 'title': 'Historical Notices' },
          ]} />
          <HighlightItems items={[
            { "title": "Maintainer Email", "value": "test@google.com", "icon": <AtSymbolIcon className="tutor-w-6 tutor-h-6" /> },
            { "title": "Domain Name", "value": "{window.location.host}", "icon": <GlobeAltIcon className="tutor-w-6 tutor-h-6" /> },
            { "title": "Last Updated At", "value": "2024-02-01 14:10:00 utc", "icon": <ClockIcon className="tutor-w-6 tutor-h-6" /> },
            { "title": "Current Version", "value": "v1.2.3", "icon": <DocumentIcon className="tutor-w-6 tutor-h-6" /> },
          ]} />

        </div>
        <div role="tablist" className="tutor-tabs tutor-tabs-boxed">
          <a role="tab" className="tutor-tab">Notices</a>
          <a role="tab" className="tutor-tab tutor-tab-active">Use Cases</a>
          <a role="tab" className="tutor-tab">Historical Notices</a>
        </div>
        {/* <h3>Target document link: </h3>
        <p>The link to {currentUrl}</p>
        <h3>Can update via following editor: </h3>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            style={{
              border: "1px solid #333",
              padding: 16
            }}
          />
        </Slate> */}
      </div>
    </div >
  )
}
