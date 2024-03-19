import type { eventWithTime } from "@rrweb/types"
import React, {
  createContext,
  useContext,
  useState
} from "react"
import { record } from 'rrweb'

export type RecordingState = "idle" | "recording"

export type RecordingStates = {
  state: RecordingState
  stopFn: (() => void) | null
}

export interface RecorderContextType {
  states: RecordingStates
  startRecording: () => void
  stopRecording: (onStop: (events: eventWithTime[]) => void) => void
}

let events: eventWithTime[] = []

export const RecorderContext = createContext<RecorderContextType | null>(null)

export function RecorderContainer({ children }) {
  const [states, setStates] = useState<RecordingStates>({
    state: 'idle', stopFn: null
  });

  const startRecording = () => {
    if (states.state != 'idle') {
      throw Error(`Wrong recorder state: ${states.state}`)
    }
    const stopFn = record({
      emit(event, _) {
        events.push(event);
      },
    })
    setStates({
      state: 'recording',
      stopFn: stopFn,
    })
  }

  const stopRecording = (onStop: (events: eventWithTime[]) => void) => {
    if (states.state != 'recording') {
      throw Error(`Wrong recorder state: ${states.state}`)
    }
    states.stopFn();
    setStates({ state: 'idle', stopFn: null });
    onStop([...events]);
    events = [];
  }

  return (
    <RecorderContext.Provider value={{ states, startRecording: startRecording, stopRecording: stopRecording }}>
      {children}
    </RecorderContext.Provider>
  )
}


export const useRecorder = (): RecorderContextType => {
  return useContext<RecorderContextType | null>(RecorderContext);
}
