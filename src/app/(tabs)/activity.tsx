import { Text, View } from 'react-native'

import { DashboardShell, SectionIntro } from '../../components/dashboard-shell'
import { activity } from '../../lib/dashboard'

export default function Activity() {
  return (
    <DashboardShell activeScreen="activity">
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
    </DashboardShell>
  )
}
