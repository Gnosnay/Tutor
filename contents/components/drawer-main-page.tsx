import { useState } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"
import type { Router } from "~contents/utils/router"


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
          <div className="tutor-flex tutor-w-full tutor-border tutor-border-[oklch(var(--p))] tutor-p-4 tutor-rounded-box tutor-overflow-x-auto">
            <div className="tutor-grid tutor-h-12 tutor-flex-grow tutor-place-items-center">
              <h2 className="tutor-font-bold tutor-text-lg tutor-whitespace-nowrap">4</h2>
              <p className="tutor-text-sm tutor-whitespace-nowrap">Notices</p>
            </div>
            <div className="tutor-divider tutor-divider-horizontal" />
            <div className="tutor-grid tutor-h-12 tutor-flex-grow tutor-place-items-center">
              <h2 className="tutor-font-bold tutor-text-lg tutor-whitespace-nowrap">78</h2>
              <p className="tutor-text-sm tutor-whitespace-nowrap">Use Cases</p>
            </div>
            <div className="tutor-divider tutor-divider-horizontal" />
            <div className="tutor-grid tutor-h-12 tutor-flex-grow tutor-place-items-center">
              <h2 className="tutor-font-bold tutor-text-lg tutor-whitespace-nowrap">13</h2>
              <p className="tutor-text-sm tutor-whitespace-nowrap">Historical Notices</p>
            </div>
          </div>

          <div className="tutor-flex tutor-flex-col tutor-py-4 tutor-items-start tutor-justify-center">
            <div className="tutor-flex tutor-flex-row tutor-w-full">
              <div className="tutor-flex-none tutor-flex tutor-items-center tutor-justify-center tutor-p-4">
                <svg className="tutor-w-6 tutor-h-6" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div>
              <div className="tutor-flex-1 tutor-flex tutor-flex-col tutor-items-start tutor-justify-center">
                <h2 className="tutor-font-bold tutor-text-md">Maintainer Email</h2>
                <p className="tutor-text-sm">test@google.com</p>
              </div>
            </div>
            <div className="tutor-flex tutor-flex-row tutor-w-full">
              <div className="tutor-flex-none tutor-flex tutor-items-center tutor-justify-center tutor-p-4">
                <svg className="tutor-w-6 tutor-h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <div className="tutor-flex-1 tutor-flex tutor-flex-col tutor-items-start tutor-justify-center">
                <h2 className="tutor-font-bold tutor-text-md">Domain Name</h2>
                <p className="tutor-text-sm">{window.location.host}</p>
              </div>
            </div>
            <div className="tutor-flex tutor-flex-row tutor-w-full">
              <div className="tutor-flex-none tutor-flex tutor-items-center tutor-justify-center tutor-p-4">
                <svg className="tutor-w-6 tutor-h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div className="tutor-flex-1 tutor-flex tutor-flex-col tutor-items-start tutor-justify-center">
                <h2 className="tutor-font-bold tutor-text-md">Last Updated At</h2>
                <p className="tutor-text-sm">2024-02-01 14:10:00 utc</p>
              </div>
            </div>
            <div className="tutor-flex tutor-flex-row tutor-w-full">
              <div className="tutor-flex-none tutor-flex tutor-items-center tutor-justify-center tutor-p-4">
                <svg className="tutor-w-6 tutor-h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div className="tutor-flex-1 tutor-flex tutor-flex-col tutor-items-start tutor-justify-center">
                <h2 className="tutor-font-bold tutor-text-md">Current Version</h2>
                <p className="tutor-text-sm">v1.2.3</p>
              </div>
            </div>
          </div>
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
