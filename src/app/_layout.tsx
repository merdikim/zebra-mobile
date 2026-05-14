import '../global.css'

import { Slot } from 'expo-router'
// import { MobileWalletProvider, createSolanaDevnet, type AppIdentity } from '@wallet-ui/react-native-kit'
// import { createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit'

// const cluster = createSolanaDevnet()
// const identity: AppIdentity = { name: 'Zebra' }

// function createMyClient(cluster: { url: string; urlWs?: string }): Client {
//     const rpc = createSolanaRpc(cluster.url);
//     const wsUrl = cluster.urlWs ?? cluster.url.replace(/^http/, 'ws');
//     const rpcSubscriptions = createSolanaRpcSubscriptions(wsUrl);
//     return { rpc, rpcSubscriptions };
// }

export default function Layout() {
  return (
    <Slot/>
    // <MobileWalletProvider cluster={cluster} createClient={createMyClient} identity={identity}>
    //   <Slot />
    // </MobileWalletProvider>
  )
}
