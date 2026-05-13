import '../global.css'

import { Slot } from 'expo-router'
import { createSolanaDevnet, MobileWalletProvider, type AppIdentity } from '../lib/mobile-wallet'

const cluster = createSolanaDevnet()
const identity: AppIdentity = { name: 'Zebra' }

export default function Layout() {
  return (
    <MobileWalletProvider cluster={cluster} identity={identity}>
      <Slot />
    </MobileWalletProvider>
  )
}
