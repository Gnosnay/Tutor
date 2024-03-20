import type { eventWithTime } from "@rrweb/types"
import React, { createContext, useContext, useState } from "react"
import { record } from "rrweb"

export type RecordingState = "idle" | "recording"

export type RecordingStates = {
  state: RecordingState
  stopFn: (() => void) | null
  prevEvents: eventWithTime[] | null
}

export interface RecorderContextType {
  states: RecordingStates
  startRecording: () => void
  stopRecording: (onStop: (events: eventWithTime[]) => void) => void
}

let gEvents: eventWithTime[] = []

export const RecorderContext = createContext<RecorderContextType | null>(null)

export function RecorderContainer({ children }) {
  const [states, setStates] = useState<RecordingStates>({
    state: "idle",
    stopFn: null,
    prevEvents: null
  })

  const startRecording = () => {
    if (states.state != "idle") {
      throw Error(`Wrong recorder state: ${states.state}`)
    }
    if (gEvents) {
      // clear event
      gEvents = []
    }
    const stopFn = record({
      emit(event, _) {
        gEvents.push(event)
      }
    })
    setStates({
      state: "recording",
      stopFn: stopFn,
      prevEvents: null
    })
  }

  const stopRecording = (onStop: (events: eventWithTime[]) => void) => {
    if (states.state != "recording") {
      throw Error(`Wrong recorder state: ${states.state}`)
    }
    states.stopFn()
    setStates({ state: "idle", stopFn: null, prevEvents: [...gEvents] })
    onStop([...gEvents])
    gEvents = []
  }

  return (
    <RecorderContext.Provider
      value={{
        states,
        startRecording: startRecording,
        stopRecording: stopRecording
      }}>
      {children}
    </RecorderContext.Provider>
  )
}

export const useRecorder = (): RecorderContextType => {
  return useContext<RecorderContextType | null>(RecorderContext)
}
