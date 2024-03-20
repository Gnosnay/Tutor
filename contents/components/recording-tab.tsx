import { VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import type { eventWithTime } from "@rrweb/types"
import React, { useEffect, useRef, useState } from "react"

import { RawPage } from "~contents/pages/page-template"
import { useRecorder } from "~contents/utils/recorder"

import Player from "./player"

const ModalPlayer = ({
  events,
  onClose
}: {
  events: eventWithTime[]
  onClose: () => void
}) => {
  return (
    <div
      className="tutor-fixed tutor-inset-0 tutor-flex tutor-flex-col 
      tutor-justify-center tutor-items-center tutor-z-50">
      <div className="tutor-inline-flex tutor-flex-col tutor-items-end">
        <button
          className="tutor-btn tutor-btn-circle tutor-btn-sm tutor-btn-primary tutor-btn-outline"
          onClick={onClose}>
          <XMarkIcon className="tutor-h-4 tutor-w-4" />
        </button>
        <Player events={events} showController={true} />
      </div>
    </div>
  )
}

export const RecordingTab = ({
  onCloseClick
}: {
  onCloseClick: () => void
}) => {
  const recorderCtx = useRecorder()
  const rawPageRef = useRef(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [inlinePlayerWidth, setInlinePlayerWidth] = useState(null)
  const prevEvents = recorderCtx.states.prevEvents

  useEffect(() => {
    if (rawPageRef.current) {
      // get parent container size
      const rect = rawPageRef.current.getBoundingClientRect()
      setInlinePlayerWidth(rect.right - rect.left)
    }
  }, [inlinePlayerWidth])

  return (
    <div ref={rawPageRef}>
      <RawPage
        title="Recording"
        className="tutor-flex tutor-items-center tutor-justify-center 
          tutor-flex-col tutor-space-y-4 tutor-h-screen"
        rightIconBtn={{
          icon: <XMarkIcon className="tutor-h-4 tutor-w-4" />,
          onClick: onCloseClick
        }}>
        <button
          className="tutor-btn tutor-btn-outline tutor-btn-primary"
          onClick={() => {
            onCloseClick()
            setTimeout(() => recorderCtx.startRecording(), 300) // same with animation css
          }}>
          <VideoCameraIcon className="tutor-w-6 tutor-h-5" />
          Click for recording
        </button>
        {showPlayer && (
          <ModalPlayer
            events={prevEvents}
            onClose={() => setShowPlayer(false)}
          />
        )}
        {/* if we still let inline player play, there will be performance issue */}
        {prevEvents && inlinePlayerWidth && !showPlayer && (
          <div
            className="tutor-bg-white tutor-p-6 tutor-rounded tutor-shadow-lg tutor-tooltip"
            data-tip="Click to play"
            onClick={() => setShowPlayer(true)}>
            <Player
              events={prevEvents}
              showController={false}
              width={(inlinePlayerWidth * 10) / 12}
            />
          </div>
        )}
      </RawPage>
    </div>
  )
}
