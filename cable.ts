import { createConsumer } from '@rails/actioncable'
import { env } from 'next-runtime-env'

const socketURL = env('NEXT_PUBLIC_WEB_SOCKET') || ''

let cable: any

function getCable() {
  if (!cable) {
    cable = createConsumer(socketURL) // Replace with your Rails server WebSocket URL
  }
  return cable
}

export default getCable
