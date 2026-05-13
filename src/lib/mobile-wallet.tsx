import React, { createContext, useContext, useMemo, type ReactNode } from 'react'
import { Alert, Platform } from 'react-native'

import type * as WalletKit from '@wallet-ui/react-native-kit'

declare const require: (id: string) => unknown

type WalletKitModule = typeof WalletKit
type AppIdentity = WalletKit.AppIdentity
type MobileWalletValue = ReturnType<WalletKitModule['useMobileWallet']>
type Cluster = ReturnType<WalletKitModule['createSolanaDevnet']>

let walletKit: WalletKitModule | null = null
let walletKitLoadError: unknown

try {
  walletKit = require('@wallet-ui/react-native-kit') as WalletKitModule
} catch (error) {
  walletKitLoadError = error
}

const fallbackCluster = {
  id: 'solana:devnet',
  label: 'Devnet',
  url: 'https://api.devnet.solana.com',
} as Cluster

const FallbackMobileWalletContext = createContext<MobileWalletValue | null>(null)

export function createSolanaDevnet() {
  return walletKit?.createSolanaDevnet() ?? fallbackCluster
}

export function MobileWalletProvider({
  children,
  cluster,
  identity,
}: {
  children: ReactNode
  cluster: Cluster
  identity: AppIdentity
}) {
  const fallbackWallet = useMemo(() => createFallbackMobileWalletValue(identity), [identity])

  if (walletKit && Platform.OS === 'android') {
    const Provider = walletKit.MobileWalletProvider

    return (
      <Provider cluster={cluster} identity={identity}>
        {children}
      </Provider>
    )
  }

  return (
    <FallbackMobileWalletContext.Provider value={fallbackWallet}>
      {children}
    </FallbackMobileWalletContext.Provider>
  )
}

export function useMobileWallet() {
  const wallet = useContext(FallbackMobileWalletContext)

  if (walletKit && Platform.OS === 'android') {
    return walletKit.useMobileWallet()
  }

  if (!wallet) {
    throw new Error('useMobileWallet must be used inside MobileWalletProvider.')
  }

  return wallet
}

function createFallbackMobileWalletValue(identity: AppIdentity): MobileWalletValue {
  const unavailable = async () => {
    const message =
      Platform.OS === 'android'
        ? 'Solana Mobile Wallet Adapter is not registered in this app build. Rebuild and reinstall the Expo dev client with `npm run android`, then restart Metro with `npm run dev`.'
        : 'Solana Mobile Wallet Adapter is only available in the Android native build.'

    console.warn(message, walletKitLoadError)
    Alert.alert('Wallet unavailable', message)
    return undefined as never
  }

  return {
    account: undefined,
    accounts: null,
    cache: undefined,
    chain: fallbackCluster.id,
    client: {} as MobileWalletValue['client'],
    connect: unavailable as MobileWalletValue['connect'],
    connectAnd: unavailable as MobileWalletValue['connectAnd'],
    deauthorizeSession: unavailable as MobileWalletValue['deauthorizeSession'],
    disconnect: async () => undefined,
    getTransactionSigner: (() => {
      throw new Error('Solana Mobile Wallet Adapter is unavailable.')
    }) as MobileWalletValue['getTransactionSigner'],
    identity,
    sendTransaction: unavailable as MobileWalletValue['sendTransaction'],
    sendTransactions: unavailable as MobileWalletValue['sendTransactions'],
    signAndSendTransaction: unavailable as MobileWalletValue['signAndSendTransaction'],
    signAndSendTransactions: unavailable as MobileWalletValue['signAndSendTransactions'],
    signIn: unavailable as MobileWalletValue['signIn'],
    signMessage: unavailable as MobileWalletValue['signMessage'],
    signMessages: unavailable as MobileWalletValue['signMessages'],
    signTransaction: unavailable as MobileWalletValue['signTransaction'],
    signTransactions: unavailable as MobileWalletValue['signTransactions'],
    store: {} as MobileWalletValue['store'],
  }
}

export type { AppIdentity }
