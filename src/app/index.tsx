import { useMemo, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMobileWallet } from '../lib/mobile-wallet'

type ScreenKey = 'home' | 'vaults' | 'proposals' | 'signers' | 'activity' | 'settings'

type ProposalStatus = 'Ready' | 'Pending' | 'Draft'

const screens: { key: ScreenKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'vaults', label: 'Vaults' },
  { key: 'proposals', label: 'Proposals' },
  { key: 'signers', label: 'Signers' },
  { key: 'activity', label: 'Activity' },
  { key: 'settings', label: 'Settings' },
]

const vaults = [
  { name: 'Treasury', value: '$248,420', threshold: '3 of 5', assets: 'USDC, SOL', risk: 'Low' },
  { name: 'Operations', value: '$42,860', threshold: '2 of 3', assets: 'USDC', risk: 'Medium' },
  { name: 'Grants', value: '$18,240', threshold: '2 of 4', assets: 'SOL, BONK', risk: 'Low' },
]

const proposals: {
  title: string
  vault: string
  amount: string
  approvals: string
  status: ProposalStatus
  eta: string
}[] = [
  {
    title: 'Send USDC to payroll',
    vault: 'Operations',
    amount: '$12,400',
    approvals: '2/3',
    status: 'Ready',
    eta: 'Expires in 8h',
  },
  {
    title: 'Swap SOL to USDC',
    vault: 'Treasury',
    amount: '$28,000',
    approvals: '2/5',
    status: 'Pending',
    eta: 'Needs 1 more',
  },
  {
    title: 'Grant round payment',
    vault: 'Grants',
    amount: '$6,800',
    approvals: '1/4',
    status: 'Draft',
    eta: 'Reviewing',
  },
]

const signers = [
  { name: 'Merdikim', address: '8mH4...2aQp', role: 'Admin', status: 'Active' },
  { name: 'Finance Lead', address: '4Rsk...9pLm', role: 'Signer', status: 'Active' },
  { name: 'Ops Desk', address: 'G7p1...xK2d', role: 'Signer', status: 'Pending' },
  { name: 'Advisor', address: '2Lq9...nV81', role: 'Viewer', status: 'Active' },
]

const activity = [
  { action: 'Proposal approved', detail: 'Payroll payment reached threshold', time: '12 min ago' },
  { action: 'Signer invited', detail: 'Ops Desk was added to Operations', time: '1h ago' },
  { action: 'Vault funded', detail: 'Treasury received 120 SOL', time: 'Yesterday' },
  { action: 'Policy changed', detail: 'Grants threshold updated to 2 of 4', time: 'Apr 28' },
]

export default function App() {
  const { account, connect, disconnect } = useMobileWallet()
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('home')

  const connectedAddress = useMemo(() => {
    if (!account) return 'Not connected'
    const address = account.address.toString()
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [account])

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar style="dark" />
      <Text>Hello world</Text>
      <View className="flex-1">
        <ScrollView className="flex-1" contentContainerClassName="px-5 pb-32 pt-4" showsVerticalScrollIndicator={false}>
          <Header
            connectedAddress={connectedAddress}
            isConnected={Boolean(account)}
            onConnect={connect}
            onDisconnect={disconnect}
          />
          <ScreenTabs activeScreen={activeScreen} onChange={setActiveScreen} />

          {activeScreen === 'home' && <HomeScreen />}
          {activeScreen === 'vaults' && <VaultsScreen />}
          {activeScreen === 'proposals' && <ProposalsScreen />}
          {activeScreen === 'signers' && <SignersScreen />}
          {activeScreen === 'activity' && <ActivityScreen />}
          {activeScreen === 'settings' && <SettingsScreen />}
        </ScrollView>

        <QuickActionBar />
      </View>
    </View>
  )
}

function Header({
  connectedAddress,
  isConnected,
  onConnect,
  onDisconnect,
}: {
  connectedAddress: string
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}) {
  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="text-sm font-semibold uppercase tracking-wide text-teal-700">Zebra Multisig</Text>
          <Text className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950" numberOfLines={1}>
            Wallet Control
          </Text>
        </View>
        <Pressable
          onPress={isConnected ? onDisconnect : onConnect}
          className={`shrink-0 rounded-full px-4 py-3 ${isConnected ? 'bg-slate-900' : 'bg-teal-600'}`}
        >
          <Text className="text-sm font-bold text-white">{isConnected ? 'Disconnect' : 'Connect'}</Text>
        </Pressable>
      </View>

      <View className="mt-5 rounded-2xl border border-teal-100 bg-white p-4">
        <View className="flex-row items-center justify-between gap-3">
          <View className="min-w-0 flex-1">
            <Text className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active wallet</Text>
            <Text className="mt-1 text-base font-bold text-slate-900" numberOfLines={1}>
              {connectedAddress}
            </Text>
          </View>
          <View className="shrink-0 rounded-full bg-teal-50 px-3 py-2">
            <Text className="text-xs font-bold text-teal-700">Devnet</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function ScreenTabs({ activeScreen, onChange }: { activeScreen: ScreenKey; onChange: (screen: ScreenKey) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
      <View className="flex-row gap-2">
        {screens.map((screen) => {
          const isActive = activeScreen === screen.key
          return (
            <Pressable
              key={screen.key}
              onPress={() => onChange(screen.key)}
              className={`rounded-full border px-4 py-2 ${
                isActive ? 'border-teal-600 bg-teal-600' : 'border-slate-200 bg-white'
              }`}
            >
              <Text className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>{screen.label}</Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}

function HomeScreen() {
  return (
    <View>
      <View className="rounded-3xl bg-teal-600 p-5">
        <Text className="text-sm font-semibold text-teal-100">Total secured</Text>
        <Text className="mt-2 text-4xl font-extrabold tracking-tight text-white" adjustsFontSizeToFit numberOfLines={1}>
          $309,520
        </Text>
        <View className="mt-5 flex-row gap-3">
          <Metric label="Vaults" value="3" inverse />
          <Metric label="Pending" value="2" inverse />
          <Metric label="Signers" value="5" inverse />
        </View>
      </View>

      <SectionTitle title="Needs Attention" action="View all" />
      <View className="gap-3">
        {proposals.slice(0, 2).map((proposal) => (
          <ProposalCard key={proposal.title} proposal={proposal} />
        ))}
      </View>

      <SectionTitle title="Vault Health" />
      <View className="rounded-2xl border border-slate-200 bg-white p-4">
        <View className="flex-row gap-3">
          <Metric label="Approval rate" value="92%" />
          <Metric label="Avg approval" value="4.2h" />
          <Metric label="Open risk" value="Low" />
        </View>
      </View>
    </View>
  )
}

function VaultsScreen() {
  return (
    <View>
      <SectionIntro
        title="Vaults"
        description="Manage balances, policies, and transfer limits for every multisig vault."
      />
      <View className="gap-3">
        {vaults.map((vault) => (
          <View key={vault.name} className="rounded-2xl border border-slate-200 bg-white p-4">
            <View className="flex-row items-start justify-between gap-4">
              <View className="min-w-0 flex-1">
                <Text className="text-lg font-extrabold text-slate-950" numberOfLines={1}>
                  {vault.name}
                </Text>
                <Text className="mt-1 text-sm text-slate-500">{vault.assets}</Text>
              </View>
              <Text className="shrink-0 text-xl font-extrabold text-slate-950">{vault.value}</Text>
            </View>
            <View className="mt-4 flex-row gap-3">
              <Metric label="Threshold" value={vault.threshold} />
              <Metric label="Risk" value={vault.risk} />
            </View>
            <View className="mt-4 flex-row gap-3">
              <SecondaryButton label="Deposit" />
              <SecondaryButton label="Send" />
              <SecondaryButton label="Policy" />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function ProposalsScreen() {
  return (
    <View>
      <SectionIntro title="Proposals" description="Review outgoing transactions, policy updates, and signer changes." />
      <View className="mb-4 flex-row gap-3">
        <PrimaryButton label="New Proposal" />
        <SecondaryButton label="Templates" />
      </View>
      <View className="gap-3">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.title} proposal={proposal} />
        ))}
      </View>
    </View>
  )
}

function SignersScreen() {
  return (
    <View>
      <SectionIntro
        title="Signers"
        description="Keep permissions clear across admins, approvers, and view-only members."
      />
      <View className="mb-4 flex-row gap-3">
        <PrimaryButton label="Invite Signer" />
        <SecondaryButton label="Roles" />
      </View>
      <View className="gap-3">
        {signers.map((signer) => (
          <View key={signer.address} className="rounded-2xl border border-slate-200 bg-white p-4">
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-1">
                <Text className="text-base font-extrabold text-slate-950">{signer.name}</Text>
                <Text className="mt-1 text-sm text-slate-500">{signer.address}</Text>
              </View>
              <View className="shrink-0 items-end">
                <Text className="text-sm font-bold text-slate-900">{signer.role}</Text>
                <Text
                  className={`mt-1 text-xs font-bold ${signer.status === 'Active' ? 'text-teal-700' : 'text-amber-600'}`}
                >
                  {signer.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function ActivityScreen() {
  return (
    <View>
      <SectionIntro title="Activity" description="A concise audit trail of approvals, changes, and vault movement." />
      <View className="rounded-2xl border border-slate-200 bg-white">
        {activity.map((item, index) => (
          <View
            key={`${item.action}-${item.time}`}
            className={`p-4 ${index === activity.length - 1 ? '' : 'border-b border-slate-100'}`}
          >
            <View className="flex-row justify-between gap-4">
              <View className="flex-1">
                <Text className="text-base font-extrabold text-slate-950">{item.action}</Text>
                <Text className="mt-1 text-sm leading-5 text-slate-500">{item.detail}</Text>
              </View>
              <Text className="shrink-0 text-xs font-semibold text-slate-400">{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View>
      <SectionIntro
        title="Settings"
        description="Set defaults for proposal expiry, notifications, and vault safeguards."
      />
      <SettingsRow label="Default network" value="Solana Devnet" />
      <SettingsRow label="Proposal expiry" value="24 hours" />
      <SettingsRow label="Spending alerts" value="Enabled" />
      <SettingsRow label="Biometric approval" value="Required" />
    </View>
  )
}

function ProposalCard({ proposal }: { proposal: (typeof proposals)[number] }) {
  const statusStyles: Record<ProposalStatus, { container: string; text: string }> = {
    Ready: { container: 'bg-teal-50', text: 'text-teal-700' },
    Pending: { container: 'bg-amber-50', text: 'text-amber-700' },
    Draft: { container: 'bg-slate-100', text: 'text-slate-600' },
  }
  const statusStyle = statusStyles[proposal.status]

  return (
    <View className="rounded-2xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-base font-extrabold text-slate-950">{proposal.title}</Text>
          <Text className="mt-1 text-sm text-slate-500">{proposal.vault}</Text>
        </View>
        <View className={`shrink-0 rounded-full px-3 py-1 ${statusStyle.container}`}>
          <Text className={`text-xs font-extrabold ${statusStyle.text}`}>{proposal.status}</Text>
        </View>
      </View>
      <View className="mt-4 flex-row gap-3">
        <Metric label="Amount" value={proposal.amount} />
        <Metric label="Approvals" value={proposal.approvals} />
        <Metric label="Status" value={proposal.eta} />
      </View>
    </View>
  )
}

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <View className="mb-4">
      <Text className="text-2xl font-extrabold tracking-tight text-slate-950">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-slate-500">{description}</Text>
    </View>
  )
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between">
      <Text className="text-lg font-extrabold text-slate-950">{title}</Text>
      {action ? <Text className="text-sm font-bold text-teal-700">{action}</Text> : null}
    </View>
  )
}

function Metric({ label, value, inverse = false }: { label: string; value: string; inverse?: boolean }) {
  return (
    <View className="flex-1">
      <Text className={`text-xs font-semibold uppercase tracking-wide ${inverse ? 'text-teal-100' : 'text-slate-400'}`}>
        {label}
      </Text>
      <Text className={`mt-1 text-base font-extrabold ${inverse ? 'text-white' : 'text-slate-950'}`}>{value}</Text>
    </View>
  )
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-center justify-between gap-4">
        <Text className="min-w-0 flex-1 text-base font-bold text-slate-900">{label}</Text>
        <Text className="max-w-[48%] text-right text-sm font-bold text-teal-700">{value}</Text>
      </View>
    </View>
  )
}

function PrimaryButton({ label }: { label: string }) {
  return (
    <Pressable className="min-w-0 flex-1 rounded-2xl bg-teal-600 px-4 py-4 active:bg-teal-700">
      <Text className="text-center text-sm font-extrabold text-white">{label}</Text>
    </Pressable>
  )
}

function SecondaryButton({ label }: { label: string }) {
  return (
    <Pressable className="min-w-0 flex-1 rounded-2xl border border-teal-100 bg-teal-50 px-4 py-4 active:bg-teal-100">
      <Text className="text-center text-sm font-extrabold text-teal-700">{label}</Text>
    </Pressable>
  )
}

function QuickActionBar() {
  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-5 pb-5 pt-3">
      <View className="flex-row gap-3">
        <PrimaryButton label="Create" />
        <SecondaryButton label="Approve" />
        <SecondaryButton label="Receive" />
      </View>
    </View>
  )
}
