import { useState, type ReactElement } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Editable, Slate, withReact } from "slate-react"
import { AtSymbolIcon, ClockIcon, DocumentIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import {
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import { type Document, getDocStatistics, getHistoricalNotices, getNotices, getUseCases } from "~contents/utils/docs-query"
import { getProductInfo } from "~contents/utils/product-query"
import React from "react"
import uniqid from 'uniqid';


function BadgeBoard({ items }: { items: { title: string, amount: number }[] }) {
  return <div className="tutor-flex tutor-w-full tutor-border tutor-border-[oklch(var(--p))] tutor-p-4 tutor-rounded-box tutor-overflow-x-auto">
    {
      items.map(item =>
        <div className="tutor-grid tutor-h-12 tutor-flex-grow tutor-place-items-center">
          <h2 className="tutor-font-bold tutor-text-lg tutor-whitespace-nowrap">{item.amount}</h2>
          <p className="tutor-text-sm tutor-whitespace-nowrap">{item.title}</p>
        </div>
      ).reduce((accumulator, currentValue, currentIndex) => {
        if (currentIndex < items.length - 1) {
          return [...accumulator, currentValue, <div className="tutor-divider tutor-divider-horizontal" />];
        } else {
          return [...accumulator, currentValue];
        }
      }, []).map((e, index) => React.cloneElement(e, { key: index }))
    }
  </div>
}

function HighlightItems({ items }: { items: { icon: ReactElement, title: string, value: string }[] }) {
  return <div className="tutor-flex tutor-flex-col tutor-py-4 tutor-items-start tutor-justify-center">
    {items.map(item => <div key={uniqid()} className="tutor-flex tutor-flex-row tutor-w-full">
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

type ActiveTab = 'notices' | 'usecases' | 'historical notices';


const getBasicInfo = async (): Promise<{ title: string, value: string, icon: ReactElement }[]> => {
  const info = await getProductInfo()
  return [
    { "title": "Maintainer Email", "value": info.maintainerEmail, "icon": <AtSymbolIcon className="tutor-w-6 tutor-h-6" /> },
    { "title": "Domain Name", "value": window.location.host, "icon": <GlobeAltIcon className="tutor-w-6 tutor-h-6" /> },
    { "title": "Last Updated At", "value": info.lastUpdateAt, "icon": <ClockIcon className="tutor-w-6 tutor-h-6" /> },
    { "title": "Current Version", "value": info.currentVersion, "icon": <DocumentIcon className="tutor-w-6 tutor-h-6" /> },
  ]
}

const LoadingComponent = ({ repeat }: { repeat: number }) => {
  return (
    new Array(repeat).fill(0).map(_ => <div key={uniqid()} className="tutor-flex tutor-gap-4 tutor-items-center tutor-mb-4">
      <div className="tutor-skeleton tutor-w-16 tutor-h-16 tutor-rounded-full tutor-shrink-0"></div>
      <div className="tutor-flex tutor-flex-col tutor-gap-4">
        <div className="tutor-skeleton tutor-h-4 tutor-w-20"></div>
        <div className="tutor-skeleton tutor-h-4 tutor-w-28"></div>
      </div>
    </div>)
  )
}

const DocBrief = ({ doc }: { doc: Document }) => {
  return (
    <div className="tutor-collapse tutor-bg-base-200 tutor-collapse-arrow tutor-mb-4">
      <input type="checkbox" defaultChecked name={`${doc.id}`} />
      <div className="tutor-collapse-title tutor-text-xl tutor-font-medium">
        {doc.title}
      </div>
      <div className="tutor-collapse-content">
        <p>{doc.brief}</p>
      </div>
    </div>
  )
}

export default function DrawerMainPage({ onClose }: { onClose: () => void }) {
  const [editor] = useState(() => withReact(withHistory(createEditor())))
  const [currentUrl, setCurrentUrl] = useState(window.location.host)
  const [activeTab, setActiveTab] = useState<ActiveTab>('usecases')

  const { isPending: isBadgesPending, error: badgeErr, data: badges, isFetching: isFetchingBadegs } = useQuery({
    queryKey: ['badgesData'],
    queryFn: getDocStatistics,
  })
  const { isPending: isInfoPending, error: infoErr, data: info, isFetching: isFetchingInfo } = useQuery({
    queryKey: ['InfoData'],
    queryFn: getBasicInfo,
  })
  const { isPending: isTabPending, isError: isTabError, error: tabErr, data: docs, isFetching: isTabFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['projects', activeTab],
      queryFn: async () => {
        switch (activeTab) {
          case 'historical notices':
            return await getHistoricalNotices()
          case 'notices':
            return await getNotices()
          case 'usecases':
            return await getUseCases()
        }
      },
      placeholderData: keepPreviousData,
    })

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]

  return (
    <div>
      <div className="tutor-navbar tutor-px-4 tutor-bg-base-100 tutor-w-full tutor-h-full">
        <div className="tutor-flex-1">
          <h2 className="tutor-card-title">Tutor Helper</h2>
        </div>
        <div className="tutor-flex-none">
          <button className="tutor-btn tutor-btn-circle tutor-btn-sm" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="tutor-h-4 tutor-w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
      <div className="tutor-w-full tutor-relative tutor-border-b tutor-border-gray-300"></div>
      <div className="tutor-px-4 tutor-py-2">
        <div className="tutor-card">
          <h2 className="tutor-text-xl tutor-my-4 tutor-font-medium">Infra Center</h2>
          {isBadgesPending ? <div className="tutor-skeleton tutor-w-full tutor-h-24 tutor-mb-2" /> : <BadgeBoard items={badges} />}
          {isInfoPending ? <div className="tutor-mt-2"><LoadingComponent repeat={3} /></div> : <HighlightItems items={info} />}
        </div>
        <div role="tablist" className="tutor-tabs tutor-tabs-boxed tutor-mb-4">
          <a role="tab"
            className={`tutor-tab ${activeTab == 'notices' ? 'tutor-tab-active' : ''}`}
            onClick={() => setActiveTab('notices')}>Notices</a>
          <a role="tab" className={`tutor-tab ${activeTab == 'usecases' ? 'tutor-tab-active' : ''}`}
            onClick={() => setActiveTab('usecases')}>Use Cases</a>
          <a role="tab" className={`tutor-tab ${activeTab == 'historical notices' ? 'tutor-tab-active' : ''}`}
            onClick={() => setActiveTab('historical notices')}>Historical Notices</a>
        </div >
        {isTabPending || isTabFetching ? (
          <div className="tutor-skeleton tutor-w-full tutor-h-48" />
        ) : isTabError ? (
          <div>Error: {tabErr.message}</div>
        ) : (
          docs.map(doc => <DocBrief key={uniqid()} doc={doc} />)
        )
        }

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
      </div >
    </div >
  )
}
