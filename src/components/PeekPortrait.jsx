import { useEffect, useRef, useState } from 'react'
import normalPeek from '../assets/normal-peek.webp'
import musicPeek from '../assets/music-peek.webp'
import adventurePeek from '../assets/adventure-peek.webp'

const PEEK = {
  professional: { src: normalPeek, w: 1096, h: 450 },
  music: { src: musicPeek, w: 1082, h: 450 },
  adventure: { src: adventurePeek, w: 999, h: 450 },
}

export default function PeekPortrait({ section }) {
  const current = PEEK[section] ?? PEEK.professional
  const [src, setSrc] = useState(current.src)
  const [visible, setVisible] = useState(false)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
    setVisible(false)
    const t = setTimeout(() => {
      setSrc(current.src)
      setVisible(true)
    }, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  return (
    <div className="peek-wrap">
      <img
        id="peekPortrait"
        className={`peek-img${visible ? ' visible' : ''}`}
        src={src}
        width={current.w}
        height={current.h}
        alt=""
        aria-hidden="true"
      />
    </div>
  )
}
