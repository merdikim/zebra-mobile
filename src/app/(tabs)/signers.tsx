import { Text, View } from 'react-native'

import { DashboardShell, PrimaryButton, SecondaryButton, SectionIntro } from '../../components/dashboard-shell'
import { signers } from '../../lib/dashboard'

export default function Signers() {
  return (
    <DashboardShell activeScreen="signers">
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
                    className={`mt-1 text-xs font-bold ${
                      signer.status === 'Active' ? 'text-teal-700' : 'text-amber-600'
                    }`}
                  >
                    {signer.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </DashboardShell>
  )
}
