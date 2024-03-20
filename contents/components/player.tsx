import type { eventWithTime } from "@rrweb/types"
import { useEffect, useRef, useState } from "react"
import Replayer from "rrweb-player"

export default function Player({ events }: { events: eventWithTime[] }) {
  const playerElRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Replayer | null>(null)

  useEffect(() => {
    if (!events) {
      return
    }

    if (!playerElRef.current) return
    playerRef.current = new Replayer({
      target: playerElRef.current as HTMLElement,
      props: {
        events,
        autoPlay: true,
        width: 300
      }
    })
    return () => {
      playerRef.current?.pause()
    }
  }, [events])

  return <div ref={playerElRef}></div>
}
