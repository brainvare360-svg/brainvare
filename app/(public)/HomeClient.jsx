'use client'

import { useEffect } from 'react'
import Home from '../../src/views/Home'

export default function HomeClient() {
  // Hide the server-rendered skeleton once client has hydrated
  useEffect(() => {
    const skeleton = document.getElementById('hero-skeleton')
    if (skeleton) skeleton.style.display = 'none'
  }, [])

  return <Home />
}
