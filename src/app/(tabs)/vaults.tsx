import { Text, View } from 'react-native'

import { DashboardShell, SecondaryButton, SectionIntro } from '../../components/dashboard-shell'
import { Metric } from '../../components/cards/metric'
import { multisigs } from '../../lib/multisigs'

export default function Vaults() {
  return (
    <DashboardShell activeScreen="vaults">
      <View>
        <SectionIntro
          title="Vaults"
          description="Manage balances, policies, and transfer limits for every multisig vault."
        />
        <View className="gap-3">
          {multisigs.map((vault) => (
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
    </DashboardShell>
  )
}
