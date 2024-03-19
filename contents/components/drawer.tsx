import { useState, type ReactElement } from "react"
import DrawerMainPage from "~contents/pages/drawer-main-page"
import { DocumentMagnifyingGlassIcon, VideoCameraIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import uniqid from 'uniqid'
import React from "react"
import { RouterContainer } from "~contents/utils/router"
import { RawPage } from "~contents/pages/page-template"
import { useRecorder } from "~contents/utils/recorder"


const BottonNavBar = ({ items }: { items: { id?: string, icon: ReactElement, title: string, onActive: () => void }[] }) => {
  const tabs = items.map((item, index) => { item.id = `${index}`; return item })
  const [activeItem, setActiveItem] = useState(tabs[0]?.id)

  return <div className="tutor-btm-nav tutor-relative tutor-w-full tutor-border-t tutor-border-gray-300
  tutor-flex">
    {tabs.map(item =>
      <a className={`tutor-text-primary tutor-flex-col tutor-justify-center 
        ${activeItem == item.id ? 'tutor-active' : ''}
      `}
        key={item.id} onClick={() => { item.onActive(); setActiveItem(item.id) }}>
        <div className="tutor-h-6 tutor-w-6">{item.icon}</div>
        <span className="tutor-btm-nav-label tutor-text-sm">{item.title}</span>
      </a>
    )}
  </div>
}

type tabType = 'docs' | 'recording' | 'settings';

const DocTab = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return <RouterContainer>
    <DrawerMainPage onClose={onCloseClick} />
  </RouterContainer>
}

const RecordingTab = ({ onCloseClick }: { onCloseClick: () => void }) => {
  const recorderCtx = useRecorder();

  return <RawPage title="Recording" className="tutor-flex tutor-items-center tutor-justify-center tutor-h-screen">
    <button className="tutor-btn" onClick={() => {
      recorderCtx.startRecording();
      onCloseClick();
    }}>
      <VideoCameraIcon className="tutor-w-6 tutor-h-5" />
      Click for recording
    </button>
  </RawPage>
}

const Settings = ({ }) => {
  return <h1>Comming soon</h1>
}

export default function Drawer({ onCloseEvent }: { onCloseEvent: () => void }) {
  const [fadeInAnimation, setFadeInAnimation] = useState(true)
  const [activeTab, setActiveTab] = useState<tabType>('docs')
  const onClose = () => {
    // fade out animation
    setFadeInAnimation(false);
    setTimeout(() => onCloseEvent(), 300); // same with animation css
  }

  const navBarTabs = [
    {
      'icon': <DocumentMagnifyingGlassIcon />,
      'title': 'Docs',
      'onActive': () => { setActiveTab('docs') },
    },
    {
      'icon': <VideoCameraIcon />,
      'title': 'Recording',
      'onActive': () => { setActiveTab('recording') },
    },
    {
      'icon': <Cog6ToothIcon />,
      'title': 'Settings',
      'onActive': () => { setActiveTab('settings') },
    },
  ]

  const tabMapping: { [key in tabType]: ReactElement } = {
    'docs': <DocTab onCloseClick={onClose} />,
    'recording': <RecordingTab onCloseClick={onClose} />,
    'settings': <Settings />
  }

  return (
    <div className="tutor-w-full">
      <div
        className="tutor-fixed tutor-inset-0 tutor-z-[51] tutor-bg-[black]/60 tutor-px-4 tutor-transition-[display]"
        onClick={onClose}
      />
      <div className={`tutor-fixed tutor-bottom-0 tutor-top-0 tutor-z-[51] tutor-right-0
        tutor-p-0 tutor-w-full sm:tutor-w-3/5 md:tutor-w-96 lg:tutor-w-96 ${fadeInAnimation ? "slide-in-right" : "slide-out-right"}
        tutor-flex tutor-flex-col tutor-h-screen
        tutor-bg-white tutor-shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] tutor-dark:bg-[#0e1726]`}>
        <div className="tutor-flex-1 tutor-overflow-y-auto">
          {tabMapping[activeTab]}
        </div>
        <BottonNavBar items={navBarTabs} />
      </div>
    </div >
  )
}
