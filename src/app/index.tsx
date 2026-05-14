import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, ScrollView, Text, View , Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getMultisigsForWallet } from '../lib/multisigs'
//import { useMobileWallet } from '@wallet-ui/react-native-kit'
import zebra_logo from '../assets/zebra.png'

export default function App() {
  //const { account, connect } = useMobileWallet()
  const walletAddress = '' //account?.address.toString()
  const walletMultisigs = getMultisigsForWallet(walletAddress)

  

  if (walletAddress && walletMultisigs.length > 0) {
    return <Redirect href="/home" />
  }

  if (!walletAddress) {
    return <NotConnectedScreen onConnect={() => void console.log('')} />
  }

  return (
    <SafeAreaView style = {{ flex:1 }}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-5 py-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center">
          <View className="mb-8">
            <Text className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950">Create your first multisig</Text>
            <Text className="mt-4 text-base leading-7 text-slate-500">
              Your wallet is connected, but there are no multisigs for this address yet.
            </Text>
          </View>

          <CreateMultisigState walletAddress={walletAddress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function NotConnectedScreen({ onConnect }: { onConnect: () => void }) {
  return (
    <SafeAreaView className="flex-1 bg-slate-950" style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View className="flex-1 justify-between px-6 pb-6 pt-40">
        <View className="gap-4 rounded-3xl">
          <View className="items-center">
            <Image source={zebra_logo} className='h-24 w-24'/>
          </View>

          <View className="rounded-lg bg-white p-5 shadow-xl">
            <View className="mb-5 rounded-lg p-4">
              <Text className="mt-2 text-2xl font-extrabold text-slate-950">Sign in with your wallet</Text>
              <Text className="mt-2 text-sm leading-6 text-slate-500">
                Your wallet is the authentication method to access your multisigs or creating new ones
              </Text>
            </View>

            <Pressable onPress={() => router.push('/home')} className="rounded-lg bg-teal-600 px-5 py-4 active:bg-teal-700">
              <Text className="text-center text-base font-extrabold text-white">Continue with email or wallet</Text>
            </Pressable>
          </View>
        </View>

        <AuthFooter />
      </View>
    </SafeAreaView>
  )
}

function AuthFooter() {
  return (
    <View className="border-t border-slate-800 pt-6 flex-row text-xs justify-between items-center">
      <View className="flex-row gap-5">
        <Text className="font-semibold text-slate-400">Terms</Text>
        <Text className="font-semibold text-slate-400">Privacy</Text>
        <Text className="font-semibold text-slate-400">Support</Text>
      </View>
      <Text className="font-bold text-slate-400">Zebra v1.0</Text>
    </View>
  )
}

function CreateMultisigState({ walletAddress }: { walletAddress: string }) {
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`

  return (
    <View className="gap-4">
      <View className="rounded-3xl border border-slate-200 bg-white p-5">
        <Text className="text-xs font-semibold uppercase tracking-wide text-slate-400">Connected wallet</Text>
        <Text className="mt-1 text-lg font-extrabold text-slate-950">{shortAddress}</Text>
      </View>

      <View className="rounded-3xl border border-teal-100 bg-white p-5">
        <Text className="text-sm font-bold uppercase tracking-wide text-teal-700">New multisig</Text>
        <Text className="mt-2 text-2xl font-extrabold text-slate-950">Set up a secure vault</Text>
        <Text className="mt-2 text-sm leading-6 text-slate-500">
          Start with a name, signer list, and approval threshold. You can add policies and spending limits after setup.
        </Text>

        <View className="mt-5 gap-3">
          <SetupRow label="Vault name" value="Treasury, Ops, Grants" />
          <SetupRow label="Signers" value="Add wallet addresses" />
          <SetupRow label="Threshold" value="Choose approvals needed" />
        </View>

        <Pressable className="mt-5 rounded-2xl bg-teal-600 px-5 py-4 active:bg-teal-700">
          <Text className="text-center text-base font-extrabold text-white">Create Multisig</Text>
        </Pressable>
      </View>
    </View>
  )
}

function SetupRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="rounded-2xl bg-slate-50 p-4">
      <Text className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</Text>
      <Text className="mt-1 text-base font-bold text-slate-900">{value}</Text>
    </View>
  )
}
